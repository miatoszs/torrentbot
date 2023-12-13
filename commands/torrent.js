const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const { t1337x } = require('@dil5han/1337x');
const fetch = require('node-fetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('torrent')
    .setDescription('Searches for torrents')
    .addStringOption(option =>
      option.setName('search')
        .setDescription('The query to search for')
        .setRequired(true)),

  async execute(interaction) {
    await interaction.deferReply();
    const query = interaction.options.getString('search');

    try {
      const data = await t1337x(query, '1');
      if (data === null || data.length === 0) {
        return interaction.editReply('No search results found.');
      }

      // Parallelizing the API calls to shorten URLs
      const fetchPromises = data.slice(0, 5).map(torrent => {
        const encoded = encodeURIComponent(torrent.Mag_torrent_url);
        return fetch(`http://mgnet.me/api/create?&format=json&opt=&m=${encoded}`, {
          "headers": {
            "accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
            "x-requested-with": "XMLHttpRequest"
          },
          "method": "GET",
          "mode": "cors"
        }).then(response => response.json());
      });

      const shortenedUrls = await Promise.all(fetchPromises);

      const embedFields = data.slice(0, 5).map((torrent, index) => {
        const shortenedUrl = shortenedUrls[index].shorturl || 'Shortening failed';
        return {
          name: `${torrent.Name}`, 
          value: `Magnet: [Link](${shortenedUrl})\nSeeders: \`${torrent.Seeds}\`\nDownloads: \`${torrent.Downloads}\`\nSize: \`${torrent.Size}\`\nUploaded: \`${torrent.Date_uploaded}\``, 
          inline: false
        };
      });

      const embed = {
        color: parseInt('0099ff', 16),
        title: `Torrent results for "${query}"`,
        description: "Here are the search results",
        fields: embedFields,
        timestamp: new Date(),
      };

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.editReply('There was an error while executing this command!');
    }
  },
};


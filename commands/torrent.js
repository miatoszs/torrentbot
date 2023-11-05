const { SlashCommandBuilder } = require('@discordjs/builders');
const torrent_module = require('discord-torrent');
const nsfwWordsData = require('../nsfwWords.json'); // Import the JSON data

module.exports = {
    data: new SlashCommandBuilder()
        .setName('torrent')
        .setDescription('Search for torrents')
        .addStringOption(option => 
            option.setName('search')
                  .setDescription('The term you want to search for')
                  .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        const searchTerm = interaction.options.getString('search').toLowerCase();

        // Use the words from the JSON data for the check
        const isNSFWSearch = nsfwWordsData.words.some(word => searchTerm.includes(word));

        if (isNSFWSearch && !interaction.channel.nsfw) {
            return await interaction.editReply('This search is only allowed in NSFW channels.');
        }

        try {
            const torrentArray = await torrent_module.grabTorrents(searchTerm);
            
            if (torrentArray.length > 0) {
                let fields = [];

                torrentArray.forEach((torrent, index) => {
                    fields.push({ name: '\u200B', value: '\u200B', inline: false }); // This adds a blank field, effectively a line separator.
                    fields.push({
                        name: `${index + 1}. ${torrent.title}`, 
                        value: `Magnet: [Link](${torrent.magnet})\nSeeders: \`${torrent.seeds}\`\nSize: \`${torrent.size}\`\nTime: \`${torrent.time}\``,  
                        inline: false
                    });
                });

                const torrentEmbed = {
                    color: parseInt('0099ff', 16),
                    title: `Torrent results for "${searchTerm}"`,
                    fields: fields,
                    timestamp: new Date()
                };

                await interaction.editReply({ embeds: [torrentEmbed] });
            } else {
                await interaction.editReply('Torrent not found!');
            }
        } catch (error) {
            console.error('Error fetching torrents:', error);

            const errorEmbed = {
                color: parseInt('ff0000', 16),
                title: 'Error',
                description: 'An error occurred while fetching torrents.',
                timestamp: new Date()
            };

            try {
                await interaction.editReply({ embeds: [errorEmbed] });
            } catch (err) {
                console.error('Error sending edited reply:', err);
            }
        }
    }
};


const { SlashCommandBuilder } = require('@discordjs/builders');
const IMDb = require('imdb-api');
const { apiKey } = require('../config.json'); // Assuming you've added your API key as "apiKey" in config.json

const cli = new IMDb.Client({ apiKey });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imdb')
        .setDescription('Search for movies or series on IMDb')
        .addStringOption(option => 
            option.setName('search')
                  .setDescription('The term you want to search for')
                  .setRequired(true)),

    async execute(interaction) {
        const searchTerm = interaction.options.getString('search');
        
        try {
            const searchResults = await cli.search({ name: searchTerm });
            const topResult = searchResults.results[0];

            if (topResult) {
                const details = await cli.get({ id: topResult.imdbid });

                const embed = {
                    color: parseInt('0099ff', 16),
                    title: details.title,
                    description: details.plot,
                    fields: [
                        { name: 'Country', value: details.country || 'N/A', inline: true },
                        { name: 'Language', value: details.languages || 'N/A', inline: true },
                        { name: 'Type', value: details.type, inline: true },
                        { name: 'Rating', value: `${details.rating}/10` || 'N/A', inline: true },
                    ],
                    image: { url: details.poster },
                    timestamp: new Date()
                };

                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply('Movie not found.');
            }
        } catch (error) {
            console.error('Error fetching IMDb data:', error);

            // Check if the error is a "Movie not found!" error
            if (error.message.includes('Movie not found!')) {
                await interaction.reply('Movie not found.');
            } else {
                await interaction.reply('An error occurred while fetching IMDb data.');
            }
        }
    }
};

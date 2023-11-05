const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

async function getGraphURL(dataPoints) {
    const chartConfig = {
        type: 'line',
        data: {
            labels: [...Array(dataPoints.length).keys()].map(String),
            datasets: [{
                data: dataPoints,
                borderColor: '#FF5733',
                fill: false
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    };

    const chartURL = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    return chartURL;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('conversion')
        .setDescription('Convert between BTC, ETH, and EUR')
        .addStringOption(option =>
            option.setName('direction')
                .setDescription('Choose the conversion direction')
                .setRequired(true)
                .addChoices(
                    { name: 'BTC to EUR', value: 'btc_to_eur' },
                    { name: 'EUR to BTC', value: 'eur_to_btc' },
                    { name: 'ETH to EUR', value: 'eth_to_eur' },
                    { name: 'EUR to ETH', value: 'eur_to_eth' },
                    { name: 'ETH to BTC', value: 'eth_to_btc' },
                    { name: 'BTC to ETH', value: 'btc_to_eth' },
                ))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Amount to convert')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const direction = interaction.options.getString('direction');
            const amount = interaction.options.getNumber('amount');

            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur');
            const data = await response.json();

            if (!data) {
                throw new Error('Unable to fetch the rates.');
            }

            let result, description;
            switch (direction) {
                case 'btc_to_eur':
                    result = amount * data.bitcoin.eur;
                    description = `${amount} BTC is approximately €${result.toFixed(2)}.`;
                    break;
                case 'eur_to_btc':
                    result = amount / data.bitcoin.eur;
                    description = `€${amount} is approximately ${result.toFixed(8)} BTC.`;
                    break;
                case 'eth_to_eur':
                    result = amount * data.ethereum.eur;
                    description = `${amount} ETH is approximately €${result.toFixed(2)}.`;
                    break;
                case 'eur_to_eth':
                    result = amount / data.ethereum.eur;
                    description = `€${amount} is approximately ${result.toFixed(8)} ETH.`;
                    break;
                case 'eth_to_btc':
                    result = amount * data.ethereum.eur / data.bitcoin.eur;
                    description = `${amount} ETH is approximately ${result.toFixed(8)} BTC.`;
                    break;
                case 'btc_to_eth':
                    result = amount * data.bitcoin.eur / data.ethereum.eur;
                    description = `${amount} BTC is approximately ${result.toFixed(8)} ETH.`;
                    break;
            }

            // Simulating the last 7 days' fluctuations around the current rate:
            const simulatedRates = Array.from({ length: 28 }, () => data.bitcoin.eur + (Math.random() - 0.5) * data.bitcoin.eur * 0.01);
            const graphURL = await getGraphURL(simulatedRates);

            const embed = {
                color: 0xFFD700,
                title: 'Crypto Exchange Rate',
                description: description,
                image: {
                    url: graphURL
                },
                timestamp: new Date(),
            }

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error during the conversion.', ephemeral: true });
        }
    }
};

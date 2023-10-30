const { SlashCommandBuilder } = require('@discordjs/builders');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Displays info about the bot.'),
    async execute(interaction) {
        const client = interaction.client;

        const totalSeconds = process.uptime();
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor(totalSeconds / (60 * 60) % 24);
        const minutes = Math.floor(totalSeconds / 60 % 60);
        const seconds = Math.floor(totalSeconds % 60);

        const uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

        const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
        const usedMemory = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${totalMemory} MB`;

        const serverCount = client.guilds.cache.size;
        const userCount = client.users.cache.size;
        const channelCount = client.channels.cache.size;

        const botInfoEmbed = {
            color: parseInt('0099ff', 16),
            title: `${client.user.username}`, // Using the bot's username as title
            description: "status:", // Adding a description "status:"
            fields: [
                { name: '🔶 Ram usage', value: usedMemory, inline: true },
                { name: '⏱ Uptime', value: uptime, inline: true },
                { name: '🔵 Users', value: userCount, inline: true },
                { name: '🖥 Servers', value: serverCount, inline: true },
                { name: '💬 Channels', value: channelCount, inline: true },
                { name: '🔧 Discord.js', value: `v${require('discord.js').version}`, inline: true },
                { name: '🌐 Node', value: process.version, inline: true },
                { name: '💻 CPU', value: `\`${os.cpus()[0].model}\``, inline: true },
                { name: '⚙️ CPU Usage', value: `${(os.loadavg()[0] * 100).toFixed(2)}%`, inline: true },
                { name: '🖥 Architecture', value: os.arch(), inline: true },
                { name: '🐧 Platform', value: os.platform(), inline: true },

            ],
            timestamp: new Date(),
        };

        await interaction.reply({ embeds: [botInfoEmbed] });
    },
};

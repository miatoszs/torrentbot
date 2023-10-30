const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Provides information about the server.'),

    async execute(interaction) {
        const guild = interaction.guild;

        // Collecting Data
        const animatedEmojis = guild.emojis.cache.filter(e => e.animated).size;
        const standardEmojis = guild.emojis.cache.size - animatedEmojis;
        const roles = guild.roles.cache.size;
        const textChannels = guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size;
        const voiceChannels = guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size;
        const members = guild.memberCount;



        // Constructing the Reply
 


        const serverinfoEmbed = {
            color: parseInt('0099ff', 16),
            title: `**Server Information | Server Name: ${guild.name}**\n`, // Using the bot's username as title
            description: "status:", // Adding a description "status:"
            fields: [
                { name: '👑 Owner:', value: `<@${guild.ownerId}>\n`, },
                // { name: 'Animated', value: `[${animatedEmojis}]: ${guild.emojis.cache.filter(e => e.animated).map(e => e).join(' ')}\n`, inline: true },
                // { name: 'Standard', value: `[${standardEmojis}]: ${guild.emojis.cache.filter(e => !e.animated).map(e => e).join(' ')}\n`, inline: true },
                { name: 'Total Emojis', value: ` [${guild.emojis.cache.size}]\n`, inline: true },
                { name: '📁 Text Channels:', value: ` ${textChannels}\n`,inline: true},
                { name: '🎤 Voice Channels:', value :`${voiceChannels}\n`, inline: true },
                { name: '⏱️ AFK Timeout: ', value: `${guild.afkTimeout} seconds\n`,inline: true },
                { name: 'Roles', value: ` [${roles}]: ${guild.roles.cache.map(r => r).join(', ')}\n`,  },
                { name: '📅 Server Creation Date: ', value: `${guild.createdAt}\n`,},
                { name: 'Members: ', value: `${members}`, inline: true },


            ],
            thumbnail: { url: guild.iconURL({ dynamic: true }) },
            timestamp: new Date(),
        };

        await interaction.reply({ embeds: [serverinfoEmbed] });
    }
};

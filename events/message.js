const { MessageEmbed } = require('discord.js');
const { prefix } = require('./../config.json');
const { botPermissionCheck } = require('./../util/permissions');

module.exports = {
	event: 'message',
	run: async (message, client) => {

		if (message.author.bot) return;
		if(message.channel.type === "dm") return message.reply("Commands do not work in private")
		if(message.channel.type === "dm") return;

		if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		if (!command) return;

		if (command.guildOnly && message.channel.type !== 'text') {
			return message.reply("I can't execute that command inside DMs!");
		}

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
			return message.channel.send(reply);
		}

		let user = await message.guild.members.cache.get(message.author.id),
			bot = await message.guild.members.cache.get(client.user.id);

		if (command.permissions) {
			if (!command.permissions.bot) command.permissions.bot = [];
			if (!command.permissions.user) command.permissions.user = [];
			let hasPermission = await botPermissionCheck(
				message.channel,
				user,
				bot,
				command.permissions,
				command.name
			);
			if (!hasPermission) {
				return;
			}
		}

		try {
			command.execute(message, args, client);
		} catch (error) {
			// console.error(error);
			const errorembed = new MessageEmbed()
			.setTitle("ERROR")
			.setColor("#FF0000")
			.addField("Channel ID",  `\`${message.channel}\``)
			.addField("Channel Name", `\`${message.channel.name}\``)
			.addField("Guild ID", `\`${message.guild.id}\``, true)
			.addField("Guild Name", `\`${message.guild.name}\``)
			client.users.cache.get('499944566292480011').send(errorembed)
      client.users.cache.get('499944566292480011').send("ERROR ```" +error+ "```" );

			const replyembed = new MessageEmbed()
			.setTitle('There was an error trying to execute that command! ')
    	.setDescription('[Click here!](https://discord.gg/XcKPwh3qRU)')

			message.reply(replyembed)

		}
	},
};

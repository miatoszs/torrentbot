const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const { TOKEN } = require('./config.json');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map()


fs.readdir('./events/', (err, files) => {
	const eventHandler = require('./handler/eventHandler.js');
	eventHandler(err, files, client);
});
fs.readdir('./commands/', (err, files) => {
	const commandHandler = require('./handler/commandHandler.js');
	commandHandler(err, files, client);
});


//státusz
client.on("ready", () => {
	console.log(`Bot is ready. (${client.guilds.cache.size} szerver - ${client.channels.cache.size} csatorna - ${client.users.cache.size} felhasználó)`);
	const statusArray = ['.torrent, WATCHING', '.play, LISTENING', '.help, PLAYING',`${client.guilds.cache.size} Servers, WATCHING`,];
	setInterval(() => {
				client.user.setStatus('dnd');
				const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ')
				const status = random[0];
				const mode = random[1];
				client.user.setActivity(status, { type: mode })

			}, 1000)
		});




client.login(TOKEN);

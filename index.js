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

["status", "buttons"].forEach(handler => {
    require(`./functions/${handler}`)(client);
});



client.login(TOKEN);

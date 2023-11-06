const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { token, clientId, topGgToken } = require('./config.json');
const fs = require('fs');

const { AutoPoster } = require('topgg-autoposter')



const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Map();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity('/torrent', { type: 'PLAYING' });

    // Delete all global commands (this step ensures that your commands are refreshed)
    try {
        const existingCommands = await rest.get(Routes.applicationCommands(clientId));
        for (const command of existingCommands) {
            await rest.delete(Routes.applicationCommand(clientId, command.id));
        }
    } catch (error) {
        console.error('Failed to delete commands:', error);
    }

    // Register global commands
    try {
        console.log('Started refreshing global application (/) commands.');
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('Successfully reloaded global application (/) commands.');
    } catch (error) {
        console.error('Failed to register commands:', error);
    }
});



client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});

const ap = AutoPoster(topGgToken, client)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})

ap.on('error', err => {
    console.warn('Error posting stats to Top.GG API: ', err)
})
client.login(token);


const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute: async (message, args, client) => {
  let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("Help")
      .setDescription("List of all commands")
      .setColor("#2756bc");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `\`${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}\``,


        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};

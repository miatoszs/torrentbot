const { MessageEmbed } = require("discord.js");
const {MessageButton} =require ("discord-buttons")
const discord =require('discord.js')
module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();
    let helpEmbed = new MessageEmbed()
      .setTitle(`${message.client.user.username} Help`)
      .setDescription("List of all commands")
      .setThumbnail("https://cdn.discordapp.com/avatars/780882185896591360/c6639a19d1384f2d02f0218c5e4335c4.webp")
      .setColor("#2756bc");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `\`${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}\``,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();
    const button =new MessageButton()
    .setStyle("green")
    .setLabel("More informatioin")
    .setID("next")
    const paypal =new MessageButton()
    .setStyle("url")
    .setLabel("paypal donate")
    .setURL("https://www.paypal.com/donate?hosted_button_id=8MZYFEV9XDDCN")
message.channel.send({
  buttons :[button,paypal],
  embed: helpEmbed
})

  }
};

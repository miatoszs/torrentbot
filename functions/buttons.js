const discord = require("discord.js")
module.exports = (client)=>{
  require('discord-buttons')(client)
  const {MessageButton} = require("discord-buttons")
  client.on('clickButton', async (button) => {
    if (button.id === 'next') {
      await button.reply.defer()

      const embed2 =new discord.MessageEmbed()
      .setTitle("info")
      .setDescription("This is an open source bot, if you have an idea to make the bot better, write a code and send me, or join to the support server!")
      const paypal =new MessageButton()
      .setStyle("url")
      .setLabel("paypal donate")
      .setURL("https://www.paypal.com/donate?hosted_button_id=8MZYFEV9XDDCN")
      const github =new MessageButton()
      .setStyle("url")
      .setLabel("Github")
      .setURL("https://github.com/miatoszs/torrentbot")
      const supportserver = new MessageButton()
      .setStyle("url")
      .setLabel("Support Server")
      .setURL("https://discord.gg/XcKPwh3qRU")
      button.message.edit({
        embed: embed2,
        buttons: [paypal, supportserver, github]
      })
    }
  })
}

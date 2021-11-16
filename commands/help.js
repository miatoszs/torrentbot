const { MessageEmbed } = require('discord.js')
const {MessageButton} =require ("discord-buttons")
module.exports = {
        name: "help",
        aliases: ["commands", "help me", "pls help"],
        description: "To show all commands",
        usage: "[command]",



    async execute(message, args, client) {
      let commands = message.client.commands.array();
        var allcmds = "";
        let prefix = "."

        const button =new MessageButton()
        .setStyle("green")
        .setLabel("More informatioin")
        .setID("next")
        const paypal =new MessageButton()
        .setStyle("url")
        .setLabel("paypal donate")
        .setURL("https://www.paypal.com/donate?hosted_button_id=8MZYFEV9XDDCN")

        commands.forEach((cmd) => {
            allcmds+="`"+prefix+cmd.name+"` ~ "+cmd.description+"\n"
        })
        let embed = new MessageEmbed()
        .setAuthor("Commands of "+client.user.username, message.member.user.displayAvatarURL({ dynamic: true }))
        .setColor("#2756bc")
        .setDescription(allcmds)
        .setFooter(`To get info of each command you can do ${prefix}help [command]`)

        if(!args[0])return message.channel.send({
          buttons :[button,paypal],
          embed: embed
        })
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Unknown Command")

            let commandinfo = new MessageEmbed()
            .setTitle("Command: "+command.info.name+" info")
            .setColor("#2756bc")
            .setDescription(`
Name: ${cmd.name}
Description: ${command.description}
Usage: \`\`${prefix}${cmd.name} ${cmd.usage}\`\`
Aliases: ${cmd.aliases.join(", ")}
`)
message.channel.send({
  buttons :[button,paypal],
  embed: commandinfo
})
        }
    }
}

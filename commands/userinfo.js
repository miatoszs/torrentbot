const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "userinfo",
  category: "info",
  aliases: ["whois", "user"],
  usage: "userinfo <user>",
  description: "information about a specific user",
  async execute(message, args, client) {
    var acknowledgements = 'None';

    let user;

    if (!args[0]) {
      user = message.member;
    } else {


      let member = message.guild.member(message.author);
      if (message.mentions.users.first()) {
        member = message.guild.member(message.mentions.users.first());
      }



      user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => { return message.channel.send(":x: I can't find this user") })
    }

    if (!user) {
      return message.channel.send(":x: I can't find this user")
    }


    //STÁTUSZ DEFINIÁLÁS

    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    }

    //JELVÉNY BADGES
let badgesicon ={
  HOUSE_BALANCE: "<:BalanceLogo:800801623621763082>",
  HOUSE_BRILLIANCE: "<:BrillianceLogo:800801623076896848>",
  HOUSE_BRAVERY: "<:BraveryLogo:800801642852122674>",
  EARLY_SUPPORTER: "<:Early_Supporter:800831122493145138>"
}

    if(user.user.id == message.guild.ownerID){
      acknowledgements = 'Server Owner';
  }
    let embed = new MessageEmbed()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    //ACTIVITY
    let array = []
    if (user.user.presence.activities.length) {

      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "None"
        let xname = data[i].details || "None"
        let zname = data[i].state || "None"
        let type = data[i].type

        array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)

        if (data[i].name === "Spotify") {
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }

        embed.setDescription(array.join("\n"))

      }
    }


      embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
      embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))
      embed.addField("Common information", `:id:: \`${user.user.id}\`\Identifier: ${user.user.discriminator}\n:wastebasket:Deleted user: ${user.deleted}\n<:bot:800832449567129660>bot: ${user.user.bot}`)
      if (user.nickname !== null) embed.addField("Nickname", user.nickname, true)
      embed.addField("Join to the server", `${user.joinedAt.toDateString()}`, true)
      embed.addField("Join to discord", moment(user.user.createdAt).format("LLLL"), true)
      embed.addField("Badges", badgesicon[user.user.flags.toArray()] || "None")
      embed.setFooter(user.user.presence.status, stat[user.user.presence.status])
      embed.addField(`Roles [${user.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${user.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
      embed.addField("Acknowledgements: ", `${acknowledgements}`)

      return message.channel.send(embed).catch(err => {
        return message.channel.send("Error : " + err)
      })



    }



  }

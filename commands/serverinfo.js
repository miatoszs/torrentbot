const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  category: "info",
description: "szerver információ",
usage: "[parancs]",
async execute(message, args, client) {


let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join(",");

var tcount = message.guild.channels.cache.filter(c => c.type === 'text').size
var vcount = message.guild.channels.cache.filter(c => c.type === 'voice').size
var afkcount = message.guild.channels.cache.filter(c => c.type === 'afk').size

let region = {
  "eu-central": ":flag_eu: Central Europe",
  "singapore": ":flag_sg: Singapore",
  "us-central": ":flag_us: U.S. Central",
  "sydney": ":flag_au: Sydney",
  "us-east": ":flag_us: U.S. East",
  "us-south": ":flag_us: U.S. South",
  "us-west": ":flag_us: U.S. West",
  "eu-west": ":flag_eu: Western Europe",
  "vip-us-east": ":flag_us: VIP U.S. East",
  "london": ":flag_gb: London",
  "amsterdam": ":flag_nl: Amsterdam",
  "hongkong": ":flag_hk: Hong Kong",
  "russia": ":flag_ru: Russia",
  "southafrica": ":flag_za:  South Africa",
  "japan": ":flag_jp: Japan",
  "europe": ":flag_eu: Europe"
}
let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    })
    try {

let serverembed = new Discord.MessageEmbed()
.setTitle(`Szerver információ | Szerver neve: ${message.guild.name}`)
.setColor("#0099ff")
.setDescription(`\n\n**:crown:Tulaj** (Vele ne baszakodjatok)${message.guild.owner.user.toString()}\n**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**<a:emojis:800841431895638036>Összes emoji [${OverallEmojis}]**`)
.addField(":hash:Csatornák", `${tcount}`, true)
.addField(":loud_sound:Csatornák", `${vcount}`, true)
.addField(':sound:AFK Csatorna', message.guild.afkChannelID === null ? 'No AFK Channel' : client.channels.cache.get(message.guild.afkChannelID).name, true)
.addField(':alarm_clock:AFK Timeout', `${message.guild.afkTimeout / 60} perc`)
.addField(`:file_cabinet:Roles [${message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
.addField(":calendar:Létrehozási dátum", message.guild.createdAt)
.addField("Te csatlakoztál", message.member.joinedAt)
.addField(":bust_in_silhouette:Felhasználók", message.guild.memberCount, true)
.addField("Régió", region[message.guild.region], true)
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setFooter(message.author.username, message.author.avatarURL())
.setTimestamp()
message.channel.send(serverembed);

} catch (err) {
  console.log(err);
  return message.reply(`Error, prbáld később`);
}}
};

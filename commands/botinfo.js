const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")




module.exports = {
    name: "botinfo",
    category: "hasznos",
  description: "Show the bot status",
  usage: ".botinfo",
  async execute(message, args) {
  //command
  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
          return console.log(err);
      }
      const duration = moment.duration(message.client.uptime).format(" D [day], H [hour], m [minits], s [seconds]");
      const botinfo = new Discord.MessageEmbed()
          .setAuthor(message.client.user.username)
          .setTitle("__**status:**__")
          .setColor("#2756bc")
          .addField("⏳ Ram usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
          .addField("⌚️ Uptime ", `${duration}`, true)
          .addField("📁 Users", `?`, true)
          .addField("📁 Servers", `${message.client.guilds.cache.size}`, true)
          .addField("📁 Channels ", `${message.client.channels.cache.size}`, true)
          .addField("👾 Discord.js", `v${version}`, true)
          .addField("🤖 Node", `${process.version}`, true)
          .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
          .addField("🤖 Architecture", `\`${os.arch()}\``, true)
          .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
          .addField("API legacy", `${(message.client.ws.ping)}ms`)
      message.channel.send(botinfo)
  });
  }
  };

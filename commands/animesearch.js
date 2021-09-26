const Discord = require("discord.js");
const malScraper = require('mal-scraper');

module.exports = {
  name: "animesearch",
  aliases: ["anime"],
description: "search anime",
usage: ". anime <anime title>",
async execute(message, args) {
  try {
  //command
  const search = `${args}`;
  if(!search)
  return message.reply('Please give me an anime title');

  malScraper.getInfoFromName(search)
    .then((data) => {
    const malEmbed = new Discord.MessageEmbed()
      .setColor("#00FF93")

      .setTitle(`Anime List search results for: ${args}`.split(',').join(' '))
      .setThumbnail(data.picture)
      .setColor('#2756bc') //I personally use bubblegum pink!
      .addField('English title', data.englishTitle, true)
      .addField('Japanese title', data.japaneseTitle, true)
      .addField('Type', data.type, true)
      .addField('Episodes', data.episodes, true)
      .addField('Rating', data.rating, true)
      .addField('Broadcast', data.aired, true)
      .addField('Score', data.score, true)
      .addField('Score Stats', data.scoreStats, true)
      .setURL(data.url);

      message.channel.send(malEmbed);

    })
  }catch{
    message.channel.send("`i can't find this`")
  }
}
};

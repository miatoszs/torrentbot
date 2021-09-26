const discord = require("discord.js");
const imdb = require("imdb-api");

module.exports = {
name: "imdb",
  description: "Search movie or series",
  usage: ".imdb <movie title>",
  async execute(message, args) {
    try{
      if(!args.length) {
        return message.channel.send("What is the title of the movie or series?")
      }

      const imob = new imdb.Client({apiKey: "5e36f0db"}) //You need to paste you imdb api

      let movie = await imob.get({'name': args.join(" ")})

      let embed = new discord.MessageEmbed()
      .setTitle(movie.title)
      .setColor("#2756bc")
      .setImage(movie.poster)
      .setTimestamp()
      .setDescription(movie.plot)

      .addField("Country", movie.country, true)
      .addField("Language", movie.languages, true)
      .addField("Type", movie.type, true)
      .addField("Rating:", `${movie.rating}`, true);


      message.channel.send(embed)
    }catch{
      message.channel.send("`i can't find this`")
    }





  }

}

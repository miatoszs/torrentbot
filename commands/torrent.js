const Discord = require("discord.js");
const torrent_module = require("../util/torrent");
const torrent = require("../util/torrent");

module.exports = {
    name: "torrent",
    aliases: ['1337x'],
    description: "search torrent",
    usage: ".torrent <torrent name>",
  async execute(message, args) {
    message.channel.send("`Searching...`")
    let query = "";
    args.map(string=> {
        query += " " + string;
    });
    torrent_module.grabTorrents(query)
    .then(torrentArray => {

        if (torrentArray.length > 0)
        {

            let torrentList = new Discord.MessageEmbed();
            torrentList.setAuthor(`@${message.author.username}`);
            torrentArray.map((torrent) => {
                torrentList.addFields(
                    { name : `${torrent.number}. ${torrent.title}`, value : `${torrent.magnet} | Seeders: ${torrent.seeds} | Size: ${torrent.size} | Time: ${torrent.time}`}
                )
            });
            message.channel.send(torrentList); //Send them the list of torrents in the channel


        }
        else
        {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle("Not found")
                    .setAuthor(message.author.username)
                    .addFields(
                        { name : "Message", value: "Torrent not found!."},
                    )
                    .setFooter(Date())
            );
        }

    });
  }}

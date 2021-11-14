
module.exports = (client)=>{
  client.on("ready", () => {
    console.log(`${client.user.username} ready!`);
    const statusArray = ['.torrent, WATCHING', '.play, LISTENING', '.help, PLAYING',`${client.guilds.cache.size} Servers, WATCHING`,];
    setInterval(() => {
          client.user.setStatus('dnd');
          const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ')
          const status = random[0];
          const mode = random[1];
          client.user.setActivity(status, { type: mode })

        }, 1000)


  });
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
}

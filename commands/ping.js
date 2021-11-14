

module.exports = {
  name: "ping",
  cooldown: 10,
  aliases:["ping"],
  description: ("Show the bot's average ping"),
  execute(message) {
    message
      .reply("📈 Average ping to API: {ping} ms", { ping: Math.round(message.client.ws.ping) })
      .catch(console.error);
  }
};

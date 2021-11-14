
module.exports = {
  name: "invite",
  aliases:["inv"],

  description: "invite",
  execute(message) {
    return message.member
      .send(
        `https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot
    `
      )
      .catch(console.error);
  }
};

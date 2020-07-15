const BaseCommand = require('.././utils/structures/BaseCommand');

module.exports = class ping extends BaseCommand {
  constructor() {
    super('ping', 'pinging', []);
  }

  async run(client, message, args) {
    message.channel.send(`🏓 Pinging....`).then((msg) => {
      const _ = new Discord.MessageEmbed()
        .setTitle("Pong!")
        .setDescription(
          `🏓 Pong!\nLatency is ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\nAPI Latency is ${Math.round(this.client.ws.ping)}ms`
        )
        .setColor("BLUE");
      msg.edit(_);
      msg.edit("\u200B");
    });
  }
  }
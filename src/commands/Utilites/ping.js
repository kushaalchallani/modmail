const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('ping', 'pinging', []);
  }

  async run(client, message, args) {
    message.channel.send(`
    🏓Pinging....`).then((msg) => {
          const _ = new Discord.MessageEmbed()
            .setTitle("Pong!")
            .setDescription(
              `
    🏓Pong!\nLatency is ${Math.floor(
                msg.createdTimestamp - message.createdTimestamp
              )}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`
            )
            .setColor(color.blue_light);
          msg.edit(_);
          msg.edit("\u200B");
        });
  }
  }
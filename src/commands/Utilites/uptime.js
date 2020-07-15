const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('verify', '', []);
  }

  async run(client, message, args) {
    const embed  = new MessageEmbed()
    .setColor(color.blue_light)
    .setTitle("Uptime")
    .setDescription(`My uptime is \`${ms(this.client.uptime, {long: true })}\``)
    

    message.channel.send(embed);
  }
  }
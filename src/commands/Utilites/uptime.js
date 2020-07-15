const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('uptime', '', []);
  }

  async run(client, message, args) {

    const embed  = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Uptime")
    .setDescription(`My uptime is \`${ms(client.uptime, {long: true })}\``)
    

    message.channel.send(embed);
  }
  }
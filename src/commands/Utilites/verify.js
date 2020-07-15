const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('verify', '', []);
  }

  async run(client, message, args) {
    message.delete()

    if (message.member.roles.cache.has('707197658007339069')) {
        const embed = new MessageEmbed()
        .setTitle("You are already Verified")
        .setColor(color.red_light)
        .setDescription("You already are verified the server, You cannot be verified again")
        .setTimestamp()
    return message.channel.send(embed).then(m => m.delete({ timeout: 5000}));
        
    }

   if (message.member.roles.add('707197658007339069')) {
    const done = new MessageEmbed()
        .setTitle("You are Verified")
        .setColor(color.green_light)
        .setDescription("You are verified the server, You may now have access to the channels")
        .setTimestamp()
       return message.channel.send(done).then(m => m.delete({ timeout: 2500}));}
  }
  }
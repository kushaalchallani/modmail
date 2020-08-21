const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = class extends BaseCommand {
  constructor() {
    super('unlock', 'Locks a specific channel', ['cmute']);
  }

  async run(client, message) {
     if(!message.member.hasPermission('MANAGE_PERMISSIONS')) return;
     const channel = message.channel
     channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null});

     const lockmessage = new MessageEmbed()
     .setColor('#0099ff')
     .setAuthor("Channel Unlocked", "https://i.imgur.com/XgTHhQ6.png")
     .setDescription(`<a:tick:733258832456843275> The channel is been unlocked. Enjoy! `)
     message.channel.send(lockmessage)
  }
}
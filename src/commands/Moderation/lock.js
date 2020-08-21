const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = class extends BaseCommand {
  constructor() {
    super('lock', 'Locks a specific channel', ['cmute']);
  }

  async run(client, message, args) {
     if(!message.member.hasPermission('MANAGE_PERMISSIONS')) return;
     const channel = message.channel
     const lockReason = (args.slice(0).join(' '));
     channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false});

     if(!lockReason) return message.channel.send('Provide a reason to the channel')

    const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

    const lockmessage = new MessageEmbed()
    .setColor('#0099ff')
    .setAuthor("Channel Locked", "https://i.imgur.com/XgTHhQ6.png")
    .setDescription(`<a:read:746004477772955718> The channel is been locked by ${message.author}\n\n\n Reason: **${lockReason}**`)
    .setFooter(datetime)
    message.channel.send(lockmessage)

  }
  }
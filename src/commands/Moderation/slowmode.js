const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const ms = require('ms')
const { MessageEmbed } = require('discord.js');
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('slowmode', 'Change the slowmode of a channel', ['slowtext', 'slowchat', 'slowtype']);
  }

  async run(client, message, args) {
    message.delete()
    if (!args[0])
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );

      let channel = message.mentions.channels.first(),
      time = args.slice(1).join(" ");
  
  if (!channel) time = args.join(" "), channel = message.channel;
  
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    let reason = message.content.slice(
      client.prefix.length + 9 + args[0].length + 1
    );

    if (message.flags[0] === "off") {
      channel.setRateLimitPerUser(0);
      return message.channel.send(`<#${channel.id}> slowmode has been deactivated.`);
    }

    if (!reason) {
      reason == "No reason provided!";
    }
    
    if (toSecond > 21600) return message.channel.send("Timer should be less than or equal to 6 hours.");
    else if (toSecond < 1) return message.channel.send("Timer should be more than or equal to 1 second.");
    
    await message.channel.setRateLimitPerUser(args[0], reason);

      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Slowmode')
      .setDescription(`<a:tick:733258832456843275> Set the slowmode of this channel to **${args[0]}** with the reason: **${reason}**`)
      .setFooter(`Done by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

      message.channel.send(embed)
  }
  }
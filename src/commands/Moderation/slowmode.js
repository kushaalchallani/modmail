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
    if (!message.member.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send("You do not have permissions to perform this command");

    if (!message.member.permissions.any(["ADMINISTRATOR", "MANAGE_CHANNELS"])) {
      return message.channel.send("Oopsie, you don't have any rights to do this.");
    }
    
    let channel = message.mentions.channels.first(),
        time = args.slice(1).join(" ");
    
    if (!channel) time = args.join(" "), channel = message.channel;
    // If the user doesn't includes the channel.
    
    if (message.flags[0] === "off") {
      channel.setRateLimitPerUser(0);
      return message.channel.send(`<#${channel.id}> slowmode has been deactivated.`);
    }
    
    if (!args[0])
    return message.channel.send(
      `You did not specify the time in seconds you wish to set this channel's slow mode too!`
    );
  if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
  let reason = message.content.slice(
    bot.prefix.length + 9 + args[0].length + 1
  );
  if (!reason) {
    reason == "No reason provided!";
  }
  message.channel.setRateLimitPerUser(args[0], reason);

      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Slowmode')
      .setDescription(`<a:tick:733258832456843275> Set the slowmode of this channel to **${args[0]}** with the reason: **${reason}**`)
      .setFooter(`Done by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

      message.channel.send(embed)
  }
  }
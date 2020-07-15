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

    // The bot doesn't have permission
    if (!message.guild.me.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send("I don't have permissions to perform this command");

        if (!args[0])
        return message.channel.send(
          `You did not specify the time in seconds you wish to set this channel's slow mode too!`
        );
      if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
      let reason = message.content.slice(
        client.prefix.length + 9 + args[0].length + 1
      );
      if (!reason) {
        reason == "No reason provided!";
      }
      message.channel.setRateLimitPerUser(args[0], reason);

      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Slowmode')
      .setDescription(`Set the slowmode of this channel to **${args[0]}** with the reason: **${reason}**`)
      .setFooter(`Done by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

      message.channel.send(embed)
  }
  }
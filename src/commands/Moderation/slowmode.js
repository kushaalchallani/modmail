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
    
    if (!time) return message.channel.send("Please includes the time format.");
    
    let convert = ms(time); // This will results the milliseconds.
    let toSecond = Math.floor(convert / 1000); // This will convert the ms to s. (seconds)
    
    if (!toSecond || toSecond == undefined) return message.channel.send("Please insert the valid time format!");
    
    if (toSecond > 21600) return message.channel.send("Timer should be less than or equal to 6 hours.");
    else if (toSecond < 1) return message.channel.send("Timer should be more than or equal to 1 second.");
    
    await channel.setRateLimitPerUser(toSecond);
    return message.channel.send(`This channel: <#${channel.id}> has been slowing down for **${ms(ms(time), {long: true})}**.`);

      //const embed = new MessageEmbed()
      //.setColor('GREEN')
      //.setTitle('Slowmode')
      //.setDescription(`<a:tick:733258832456843275> Set the slowmode of this channel to **${args[0]}** with the reason: **${reason}**`)
      //.setFooter(`Done by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
      //.setTimestamp()

      message.channel.send(embed)
  }
  }
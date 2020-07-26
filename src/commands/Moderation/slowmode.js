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

    if (!message.member.hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return message.channel.send("You do not have permissions to perform this command").then(m => m.delete({ timeout: 5000}));


    if (!args[0])
    return message.channel.send(
      `You did not specify the time in seconds you wish to set this channel's slow mode too!`
    ).then(m => m.delete({ timeout: 5000}));
  if (isNaN(args[0])) return message.channel.send(`That is not a number!`).then(m => m.delete({ timeout: 5000}));
  let reason = message.content.slice(
    client.prefix.length + 9 + args[0].length + 1
  );


      const confirm = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('Confirmation')
      .setDescription(`**${message.author}**, you are about to change the slowmode to **${args[0]} seconds**. Type **\`yes\`** to change the slowmode of this channel.\n\nTo cancel the command type **\`no\`**`)

      message.channel.send(confirm).then(m => m.delete({ timeout: 60000}));



const filter = (m) => m.author.id === message.author.id && (m.content.toLowerCase() === "yes" || m.content.toLowerCase() === "no")  // Create a filter, only accept messages from the user that used the command and the message includes "yes" or "no"
message.channel.awaitMessages(filter, {max: 1, time: 30000})
    .then(collected => {
        const msg = collected.first()
        if(msg.content.toLowerCase() === "yes") {
          message.channel.setRateLimitPerUser(args[0],);
            message.channel.send(`<a:tick:733258832456843275> Successfully changed the slowmode of this channel to **${args[0]}**`)
        } else {
            if(msg.content.toLowerCase() === "no")
                message.channel.send('Cancelled command.')
        }
    })
  }
  }
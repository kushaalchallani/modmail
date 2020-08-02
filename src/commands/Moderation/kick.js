const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('kick', 'Kicks a user from the server', ['k']);
  }

  async run(client, msg, args) {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send('You can\'t use that!');

    var user = msg.mentions.users.first() ||  msg.guild.members.cache.get(args[0]);
    if(!user) return msg.channel.send('You didn\'t mention anyone!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.channel.send('They aren\'t in the server!');
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('You cannot kick this person!');

    var reason = args.slice(1).join(' ');
    if(!reason) return msg.channel.send('You need to give a reason!');

    var channel = msg.guild.channels.cache.find(c => c.name === 'mod-log');

    var log = new Discord.MessageEmbed()
    .setTitle('User Kicked')
    .setColor(color.red_bright)
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    msg.guild.channels.cache.find(ch => ch.name === 'mod-log').send(log);

    var embed3 = new Discord.MessageEmbed()
    .setTitle('You were banned!')
    .setColor(color.red_bright)
    .setDescription(`You were kicked from **${message.guild.name}** for **${reason}**. If you feel this punishment is unjustified, rejoin the server and create a ticket`);

    try {
        await user.send(embed3);
    } catch(err) {
        console.warn(err);
    }

    member.kick(reason);

    
    var embed2 = new Discord.MessageEmbed()
    .setDescription(`<a:tick:733258832456843275> **${user}** has successfully been kicked from the server! `)
    .setColor(color.green_bright)
    msg.channel.send(embed2);
  }
  }
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")
const ms = require('ms');

module.exports = class extends BaseCommand {
  constructor() {
    super('mute', 'Mutes a user in the server', ['m', 'nospeak', 'notalk']);
  }

  async run(client, message, args) {        
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that!');

    var user = message.mentions.users.first();
    if(!user) return message.reply('You didn\'t mention anyone!');

    var member;

    try {
        member = await message.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return message.reply('They aren\'t in the server!');
    if(member.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot mute that person!');

    var rawTime = args[1];
    var time = ms(rawTime);
    if(!time) return message.reply('You didn\'t specify a time!');

    var reason = args.splice(2).join(' ');
    if(!reason) return message.reply('You need to give a reason!');

    var channel = message.guild.channels.cache.find(c => c.name === 'Muted');

    var log = new Discord.MessageEmbed()
    .setTitle('User Muted')
    .addField('User:', user, true)
    .addField('By:', message.author, true)
    .addField('Expires:', rawTime)
    .addField('Reason:', reason)
    message.guild.channels.cache.find(ch => ch.name === 'mod-log').send(lo);

    var embed = new Discord.MessageEmbed()
    .setTitle('You were muted!')
    .addField('Expires:', rawTime, true)
    .addField('Reason:', reason, true);

    try {
        message.user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    var role = message.guild.roles.cache.find(r => r.name === 'Muted');

    member.roles.add(role);

    setTimeout(async() => {
        member.roles.remove(role);
    }, time);

    message.channel.send(`**${user}** has been muted by **${message.author}** for **${rawTime}**!`);
    
  }
  }
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")
const ms = require('ms');

module.exports = class extends BaseCommand {
  constructor() {
    super('mute', 'Mutes a user in the server', ['m', 'nospeak', 'notalk']);
  }

  async run(client, message, args) {        
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You can\'t use that!');

    var user = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send('You didn\'t mention anyone!');

    var member;

    try {
        member = await message.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return message.channel.send('They aren\'t in the server!');
    if(member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You cannot mute that person!');

    var rawTime = args[1];
    var time = ms(rawTime);
    if(!time) return message.channel.send('You didn\'t specify a time!');

    var reason = args.splice(2).join(' ');
    if(!reason) return message.channel.send('You need to give a reason!');

    var channel = message.guild.channels.cache.find(c => c.name === 'Muted');

    var log = new Discord.MessageEmbed()
    .setTitle('User Muted')
    .addField('User:', user, true)
    .addField('By:', message.author, true)
    .addField('Expires:', rawTime)
    .addField('Reason:', reason)
    message.guild.channels.cache.find(ch => ch.name === 'mod-log').send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('You were muted!')
    .setColor(color.orange)
    .setDescription(`You were muted from **${message.guild.name}** for **${reason}**. If you feel this punishment is unjustified, DM KC's Utilites`)
    .addField('Expires:', rawTime, true)
    .addField('Reason:', reason, true);

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    var role = message.guild.roles.cache.find(r => r.name === 'Muted');

    member.roles.add(role);

    setTimeout(async() => {
        member.roles.remove(role);
    }, time);


    var embed2 = new Discord.MessageEmbed()
    .setDescription(`<a:tick:733258832456843275> **${user}** has successfully been muted for **${rawTime}**!`)
    .setColor(color.green_bright)
    msg.channel.send(embed2);
    message.channel.send(embed2);
    
  }
  }
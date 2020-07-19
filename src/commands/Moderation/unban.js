const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const ms = require('ms')
const { MessageEmbed } = require('discord.js');
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('unban', 'Clears the Messages', ['b']);
  }

  async run(client, msg, args) {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('You can\'t use that!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('You didn\'t mention anyone!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(member){
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You cannot ban this person!');
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('You need to give a reason!');

    var log = new Discord.MessageEmbed()
    .setTitle('User Banned')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    msg.guild.channels.cache.find(ch => ch.name === 'mod-log').send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('You were unbanned!')
    .setDescription(reason);

    try {
        await user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    msg.guild.members.unban(user); 

    msg.channel.send(`**${user}** has been unbanned by **${msg.author}**!`);
  }
  }
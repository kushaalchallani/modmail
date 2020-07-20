const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const ms = require('ms')
const { MessageEmbed } = require('discord.js');
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('ban', 'Clears the Messages', ['b']);
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
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('You cannot ban this person!').then(m => m.delete({ timeout: 5000}));
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.channel.send('You need to give a reason!').then(m => m.delete({ timeout: 5000}));

    var log = new Discord.MessageEmbed()
    .setTitle('User Banned')
    .setColor(color.red_bright)
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    msg.guild.channels.cache.find(ch => ch.name === 'mod-log').send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle('You were banned!')
    .setColor(color.red_bright)
    .setDescription(`You were banned from for ${reason}. If you feel this punishment is unjustified, click [here](https://forms.gle/gh7eXLBwN5h5hZhP7) `);

    try {
        await user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    msg.guild.members.ban(user); // This should not be user.id like I said in my video. I made a mistake. Sorry! :)

    msg.channel.send(`**${user}** has been banned by **${msg.author}**!`);
  }
  }
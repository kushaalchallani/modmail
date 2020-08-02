const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message} = require("discord.js");
const color = require("../../events/message/colors.json")
const db = require('quick.db')

module.exports = class extends BaseCommand {
  constructor() {
    super('warn', 'warns an user', ['w', 'strike']);
  }

  async run(client, message, args) {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.reply("You can warn anyone becuase you don\'t have the required permissions")
      }
      
      const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
      
       if(!user) {
        return message.channel.send("Please Mention or use the id of the person to who you want to warn - `warn @mention <reason>`")
      }

      if(message.author.id === user.id) {
        return message.channel.send("You can not warn yourself")
      }

      if(!message.author.id === message.guild.owner.id) {
        return message.channel.send("You jerk, how you can warn server owner -_-")
      }

      const reason = args.slice(1).join(" ")

  if(!reason) {
      return message.channel.send("Please provide reason to warn - `warn @mention <reason>`")
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

    if(warnings === 5) {
        const warnembed = new MessageEmbed()
        .setTitle('Warning Limit reached')
        .setColor(color.red_bright)
        .setDescription(`${user} already reached his/her limit with 5 warnings`)
        message.channel.send(warnembed)
      }

      if(warnings === null) {
        db.set(`warnings_${message.guild.id}_${user.id}`, 1)
        
        const userembed = new MessageEmbed()
        .setTitle('You were warned')
        .setColor(color.orange)
        .setDescription(`You were warned in **${message.guild.name}** for **${reason}**. If you feel this punishment is unjustified, Dm me or create a ticket in <#732900005693620265> using the command \`>ticket\``);
        user.send(userembed)


        const embed2 = new MessageEmbed()
        .setDescription(`<a:tick:733258832456843275> **${user}** has successfully been warned for ${reason}`)
        .setColor(color.green_bright)
        message.channel.send(embed2);
      
        const log = new MessageEmbed()
        .setTitle('User Warned')
        .setColor(color.red_bright)
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        message.guild.channels.cache.find(ch => ch.name === 'mod-log').send(log);
    
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)

        const userembed2 = new MessageEmbed()
        .setTitle('You were warned')
        .setColor(color.orange)
        .setDescription(`You were warn in **${message.guild.name}** for **${reason}**. If you feel this punishment is unjustified, Dm me or create a ticket in <#732900005693620265> using the command \`>ticket\``);
        user.send(userembed2)

        var embed3 = new MessageEmbed()
        .setDescription(`<a:tick:733258832456843275> **${user}** has successfully been warned for ${reason}`)
        .setColor(color.green_bright)
        message.channel.send(embed3);

        const log2 = new MessageEmbed()
        .setTitle('User Warned')
        .setColor(color.red_bright)
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        message.guild.channels.cache.find(ch => ch.name === 'mod-log').send(log2);
    }
  }
  }
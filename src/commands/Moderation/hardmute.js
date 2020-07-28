const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('hardmute', 'Permanently mutes a user untile unmute command is used', ['hm']);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(
          "Sorry but you do not have permission to unmute anyone"
        );
      }
  
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("I do not have permission to manage roles.");
      }

      const user = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.channel.send(
        "Please mention the member to who you want to unmute"
      );
    }
 
    if(user.id === message.author.id) {
      return message.channel.send("I won't mute you -_-");
    }

    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      return message.channel.send("Please Give the reason to mute the member")
    }

    let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
    
    
      if(!muterole) {
      return message.channel.send("This server do not have role with name `Muted`")
    }
    
    if(user.roles.cache.has(muterole)) {
        return message.channel.send("Given User is already muted")
      }

      user.roles.add(muterole)
      
      var embed2 = new Discord.MessageEmbed()
      .setDescription(`<a:tick:733258832456843275> **${user}** has successfully been hardmuted! `)
      .setColor(color.green_bright)
      msg.channel.send(embed2);
      await message.channel.send(embed2)
          
      var embed3 = new Discord.MessageEmbed()
      .setTitle('You were banned!')
      .setColor(color.red_bright)
      .setDescription(`You were hardmuted in **${message.guild.name}** for **${reason}**. If you feel this punishment is unjustified, DM KC's Utilites`);
          
      user.send(embed3)
  }
  }
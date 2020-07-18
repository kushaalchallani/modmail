const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('hardmute', 'closes the mail', []);
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

      const user = message.mentions.members.first();

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
    
      await message.channel.send(`You muted **${message.mentions.users.first().username}** For \`${reason}\``)
          
          user.send(`You are muted in **${message.guild.name}** For \`${reason}\``)
  }
  }
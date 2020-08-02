const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed} = require("discord.js");
const color = require("../../events/message/colors.json")
const db = require('quick.db')

module.exports = class extends BaseCommand {
  constructor() {
    super('reset-warns', 'resets an user\'s warnings', ['rw', 'cw']);
  }

  async run(client, message, args) {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("You can't reset anyone's warnings")
      }
      
      const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
      
      if(!user) {
      return message.channel.send("Please mention the person whose warning you want to reset")
      }

      if(message.author.id === user.id) {
        return message.channel.send("You are not allowed to reset your warnings")
      }
      
      let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
      
      if(warnings === null) {
        return message.channel.send(`${message.mentions.users.first().username} do not have any warnings`)
      }

      db.delete(`warnings_${message.guild.id}_${user.id}`)
      user.send(`Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`)
      await message.channel.send(`Reseted all warnings of ${message.mentions.users.first().username}`) //DO NOT FORGET TO USE ASYNC FUNCTION
      

  }
  }
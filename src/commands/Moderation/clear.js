const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const ms = require('ms')
const { MessageEmbed } = require('discord.js');
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('clear', 'Clears the Messages', ['c', 'mdelete', 'massdelete']);
  }

  async run(client, message, args) {
    const messageArray = message.content.split(' ');
    const args = messageArray.slice(1);
  
      if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('Lack of Perms!');
      
      let deleteAmount;
  
      if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Please put a number only!') }
  
      if (parseInt(args[0]) > 100) {
          return message.reply('You can only delete 100 messages at a time!')
      } else {
          deleteAmount = parseInt(args[0]);
      }
  
      message.channel.bulkDelete(deleteAmount + 1, true);
      message.reply(`**Successfully** Deleted ***${deleteAmount}*** Messages.`)
  }
  }
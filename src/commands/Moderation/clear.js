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
    if (message.deletable) {
        message.delete();
    }

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return  message.channel.send("You cannot do that").then(m => m.delete(5000));
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return  message.channel.send("This is not a number").then(m => m.delete({ timeout: 5000}));
    }

    let deleteAmount;
    if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(args[0]);
    }


    message.channel.bulkDelete(deleteAmount, true)
    .catch(err => message.channel.send(`Something went wrong... ${err}`));

    message.channel.send(`I have cleared ${deleteAmount.cache.size} messages`)
  }
  }
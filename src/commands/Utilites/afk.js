const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('afk', 'Sets an Afk status', []);
  }

  async run(client, message, args) {
    
    message.member.setNickname(`[AFK]${message.member.displayName}`);
return message.reply("Please come back soon... :(");
  }
  }
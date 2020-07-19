const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('ping', 'Check the latency of the bot', ['p', 'pong']);
  }

  async run(client, message, args) {
    
  }
  }
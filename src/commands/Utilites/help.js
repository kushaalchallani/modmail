const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('help', 'get help', ['h', 'commands']);
  }

  async run(client, message, args) {
    message.delete()
  }
  }
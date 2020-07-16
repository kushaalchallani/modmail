const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('help', 'Cget help', ['h', 'commands']);
  }

  async run(client, message, args) {
    message.delete()
  }
  }
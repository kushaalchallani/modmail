const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('afk', 'Set an afk status', []);
  }

  async run(client, message, args) {
  }
  }
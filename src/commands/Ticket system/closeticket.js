const { DiscordTicket } = require('discord_ticket_maker')
const ticket = new DiscordTicket()
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class extends BaseCommand {
  constructor() {
    super('tclose', 'set support ticket role', ['tc']);
  }

  async run(client, msg, args) {
    const channel = msg.mentions.channels.first() || msg.channel

    ticket.closeTicket(msg, channel)
  }
  }
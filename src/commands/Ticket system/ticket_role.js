const { DiscordTicket } = require('discord_ticket_maker')
const ticket = new DiscordTicket()
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class extends BaseCommand {
  constructor() {
    super('ticket-role', 'set support ticket role', ['tr']);
  }

  async run(client, message, args) {

    var role = message.mentions.roles.first()

    ticket.setRole(message, role)
  }
  }
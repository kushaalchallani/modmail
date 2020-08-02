const { DiscordTicket } = require('discord_ticket_maker')
const ticket = new DiscordTicket()
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class extends BaseCommand {
  constructor() {
    super('ticket', 'make a support ticket', []);
  }

  async run(client, msg, args) {
    const reason = args.join(" ")

    ticket.makeTicket(msg, reason)
    
  }
  }
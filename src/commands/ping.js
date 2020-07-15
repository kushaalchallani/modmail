const BaseCommand = require('.././utils/structures/BaseCommand');

module.exports = class ping extends BaseCommand {
  constructor() {
    super('ping', 'pinging', []);
  }

  async run(client, message, args) {
    message.channel.send('Pong!');
  }
}
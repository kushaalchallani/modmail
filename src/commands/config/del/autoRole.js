const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../Constants.js');

class DelConfigAutoRoleCommand extends Command {
  constructor() {
    super('config-del-autorole', {
      category: 'config',
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
    });
  }

  async exec(message) {
    this.client.settings.delete(message.guild.id, SETTINGS.AUTO_ROLE);
    return message.util.send('I have now deleted join role config.');
  }
}

module.exports = DelConfigAutoRoleCommand;
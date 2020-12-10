const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../Constants.js');

class DelConfigMemberChannelCommand extends Command {
  constructor() {
    super('config-del-memberlog', {
      category: 'config',
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
    });
  }

  async exec(message) {
    this.client.settings.delete(message.guild.id, SETTINGS.MEMBERLOG);
    return message.util.send('Now deleted the memberlog channel config.');
  }
}

module.exports = DelConfigMemberChannelCommand;
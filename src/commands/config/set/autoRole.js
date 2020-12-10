const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../Constants.js');

class SetConfigAutoRoleCommand extends Command {
  constructor() {
    super('config-set-autorole', {
      category: 'config',
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      args: [
        {
          id: 'role',
          match: 'content',
          type: 'role',
          prompt: {
            start: message => `${message.author}, what role would you like to set as the auto role?`,
          },
        },
      ],
    });
  }

  async exec(message, { role }) {
    this.client.settings.set(message.guild.id, SETTINGS.AUTO_ROLE, role.id);
    return message.util.send(`I have now set the auto role to **${role.name}**`);
  }
}

module.exports = SetConfigAutoRoleCommand;
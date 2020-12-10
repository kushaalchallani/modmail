const { Command } = require('discord-akairo');
const { SETTINGS } = require('../../../Constants.js');

class SetConfigMemberChannelCommand extends Command {
  constructor() {
    super('config-set-memberlog', {
      category: 'config',
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
      args: [
        {
          id: 'channel',
          match: 'content',
          type: 'textChannel',
          prompt: {
            start: message => `${message.author}, what channel would you like to set as the memberlog channel?`,
          },
        },
      ],
    });
  }

  async exec(message, { channel }) {
    this.client.settings.set(message.guild.id, SETTINGS.MEMBERLOG, channel.id);
    return message.util.send(`I have now set the memberlog channel to ${channel}`);
  }
}

module.exports = SetConfigMemberChannelCommand;
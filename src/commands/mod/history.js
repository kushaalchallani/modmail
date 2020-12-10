const { Command, Argument } = require('discord-akairo');

class BanCommand extends Command {
  constructor() {
    super('history', {
      aliases: ['history'],
      description: {
        content: 'View the history of a member.',
        usage: '[member]',
        examples: ['@Jez', '377907498264559621'],
      },
      userPermissions: ['EMBED_LINKS'],
      category: 'mod',
      args: [
        {
          id: 'user',
          type: Argument.union('user', async (_, input) => {
            try {
              const user = await this.client.users.fetch(input);
              return user || null;
            }
            catch { } // eslint-disable-line no-empty
          }),
          prompt: {
            start: message => `${message.author}, which members history would you like to view?`,
          },
        },
      ],
    });
  }

  async exec(message, { user }) {
    const embed = await this.client.history.embed(message.guild, user);
    message.util.send(embed);
  }
}

module.exports = BanCommand;
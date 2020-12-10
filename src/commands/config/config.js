const { Command, Flag } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class ConfigCommand extends Command {
  constructor() {
    super('config', {
      aliases: ['config'],
      description: {
        content: stripIndents`
          Available methods:
          • set \`<key> <...arguments>\`
          • delete \`<key>\`
          
          Available keys:
          • cases \`<number>\`
          • modlog \`<channel>\`
          • memberlog \`<channel>\`
        `,
        usage: '<method> <...arguments>',
        examples: [
          'set cases 123',
          'set modlog #ModLog',
          'set memberlog #MemberLog',
          'delete cases',
          'delete modlog',
        ],
      },
      category: 'config',
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
    });
  }

  *args() {
    const method = yield {
      type: [
        ['config-set', 'set'],
        ['config-del', 'del', 'delete', 'remove'],
      ],
      otherwise: 'Check `?help config` for more information.',
    };

    return Flag.continue(method);
  }
}

module.exports = ConfigCommand;
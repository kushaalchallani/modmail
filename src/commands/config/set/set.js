const { Command, Flag } = require('discord-akairo');

class SetConfigCommand extends Command {
  constructor() {
    super('config-set', {
      category: 'config',
      channel: 'guild',
      userPermissions: ['MANAGE_GUILD'],
    });
  }

  *args() {
    const key = yield {
      type: [
        ['config-set-modlog', 'modLog', 'modlog'],
        ['config-set-cases', 'cases', 'case', 'caseNumber', 'caseNum'],
        ['config-set-memberlog', 'memberLog', 'memberlog'],
        ['config-set-autorole', 'autorole', 'autoRole', 'joinrole', 'joinRole'],
      ],
      otherwise: 'Check `?help config` for more information',
    };

    return Flag.continue(key);
  }
}

module.exports = SetConfigCommand;
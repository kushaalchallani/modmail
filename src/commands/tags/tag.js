const { Command, Flag } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class TagCommand extends Command {
  constructor() {
    super('tag', {
      aliases: ['tag'],
      description: {
        content: stripIndents`
                    Available methods:
                    • add \`[--hoist/--template] <tag> <content>\`
                    • alias \`<--add/--del> <tag> <alias>\`
                    • delete \`<tag>\`
                    • edit \`[--hoist/--unhoist] [--template/--untemplate] <tag> <content>\`
                    • source \`<tag>\`
                    • info \`<tag>\`
                    • show \`<tag>\`
                    • search \`<tag>\`
                    • list \`[member]\`
                    • download \`[member]\`
                `,
        usage: '<method> <...arguments>',
        examples: [
          'add Test Test',
          'add --template Test Test1 ${guild}',
          'alias --add Test1 Test2',
          'alias --del Test1 Test2',
          'delete Test1',
          'edit Test1 Test2',
          'edit --hoist Test1',
          'edit --template Test1 Test2 ${guild}',
          'source Test',
          'info Test',
          'show Test',
          'search Test',
          'list @Coltz',
          'download @Coltz',
        ],
      },
      category: 'tags',
      channel: 'guild',
    });
  }

  *args() {
    const method = yield {
      type: [
        ['tag-add', 'add', 'create'],
        ['tag-del', 'del', 'delete'],
        ['tag-show', 'show', 'view'],
        ['tag-search', 'search', 'look'],
        ['tag-edit', 'edit', 'change'],
        ['tag-alias', 'alias', 'aliases'],
        ['tag-info', 'info', 'data', 'information'],
        ['tag-source', 'source'],
        ['tag-list', 'list'],
        ['tag-download', 'download'],
        ['tag-rename', 'rename'],
      ],
      otherwise: (message) => {
        const prefix = this.handler.prefix(message);
        message.util.send(stripIndents`
                    No idea what your trying to do.
                    Check \`${prefix}help tag\` for more information.
                `);
      },
    };

    return Flag.continue(method);
  }
}

module.exports = TagCommand;
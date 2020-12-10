const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { COLORS } = require('../../Constants.js');
const { stripIndents } = require('common-tags');

class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help'],
      description: {
        content: 'Displays a list of all my commands.',
        usage: '[command]',
      },
      category: 'util',
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          id: 'command',
          type: 'commandAlias',
        },
      ],
    });
  }

  async exec(message, { command }) {
    // Credits To: https://github.com/Naval-Base/yuudachi/blob/e6b29e96eaca21def434e33094b56e738dc12844/src/bot/commands/util/help.ts
    const prefix = this.handler.prefix(message);
    if (!command) {
      const embed = new MessageEmbed()
        .setColor(COLORS.EMBED)
        .addField('❯ Commands', stripIndents`A list of available commands.
                    For additional info on a command, type \`${prefix}help <command>\``);

      for (const category of this.handler.categories.values()) {
        embed.addField(
          `❯ ${category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase())}`,
          `${category
            .filter(cmd => cmd.aliases.length)
            .map(cmd => `\`${cmd.aliases[0]}\``)
            .join(' ')}`,
        );
      }

      return message.util.send(embed);
    }

    const embed = new MessageEmbed()
      .setColor(COLORS.EMBED)
      .setTitle(`\`${command.aliases[0]} ${command.description.usage || ''}\``)
      .addField('❯ Description', command.description.content || '\u200b');

    if (command.aliases.length > 1) embed.addField('❯ Aliases', `\`${command.aliases.join('` `')}\``, true);
    if (command.description.examples.length) {
      embed.addField(
        '❯ Examples',
        `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``,
        true,
      );
    }

    return message.util.send(embed);
  }
}

module.exports = HelpCommand;
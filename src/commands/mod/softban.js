const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class SoftbanCommand extends Command {
  constructor() {
    super('softban', {
      aliases: ['softban'],
      description: {
        content: 'Softban a member from the guild.',
        usage: '<member> [reason]',
        examples: ['@Tomson weird.'],
      },
      clientPermissions: ['BAN_MEMBERS', 'EMBED_LINKS'],
      userPermissions: ['BAN_MEMBERS'],
      category: 'mod',
      args: [
        {
          id: 'member',
          type: 'member',
          prompt: {
            start: message => `${message.author}, what member would you like to softban?`,
          },
        },
        {
          id: 'reason',
          match: 'rest',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  async exec(message, { member, reason }) {
    if (member.roles.highest.rawPosition >= message.member.roles.highest.rawPosition) {
      return message.channel.send('You know you can\'t softban this member, so why bother trying.');
    }
    const softbanMessage = await message.channel.send(`Softbanning **${member.user.tag}**...`);
    if (member.bannable) {
      try {
        try {
          await member.send(stripIndents(`
              You have been softbanned from **${message.guild.name}**
              You may join back when ever you wish.
          `));
        }
        catch { } // eslint-disable-line no-empty, brace-style
        await member.ban({ reason: reason, days: 7 });
        await this.client.cases.commit(message.guild, {
          guild: message.guild.id,
          mod: message.author,
          target: member.user,
          action: this.id,
          reason: reason,
        });
        await this.client.history.add(message.guild, member, this.id);
        await message.guild.members.unban(member.id);
        softbanMessage.edit(`Sucessfully softbanned **${member.user.tag}**`);
      }
      catch (error) {
        softbanMessage.edit(`There was an error when trying to softban **${member.user.tag}**`);
        console.log(error);
      }
    }
    else {
      softbanMessage.edit('I don\'t have permissions to softban this member.');
    }
  }
}

module.exports = SoftbanCommand;
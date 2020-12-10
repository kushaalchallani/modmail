const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { COLORS } = require('../../Constants.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');

const ACTIVITIES = {
  online: 'Online',
  idle: 'Idle',
  offline: 'Offline',
  dnd: 'DND',
};

class UserCommand extends Command {
  constructor() {
    super('user', {
      aliases: ['user', 'user-info', 'member', 'member-info'],
      description: {
        content: 'Get info on a user.',
        usage: '[member]',
        examples: ['Coltz', '81440962496172032'],
      },
      category: 'info',
      channel: 'guild',
      clientPermissions: ['EMBED_LINKS'],
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
          default: (message) => message.author,
        },
      ],
    });
  }

  async exec(message, { user }) {
    const member = message.guild.member(user);
    const embed = new MessageEmbed()
      .setColor(COLORS.EMBED)
      .setThumbnail(user.displayAvatarURL())
      .setDescription(`Info about **${user.tag}** (ID: ${user.id})`)
      .addField('❯ User Details', stripIndents`
				• ID: ${user.id}
				• Tag: ${user.tag}
				• Created At: ${moment(user.createdAt).format('L')}
				• Status: ${ACTIVITIES[user.presence.status]}
				• Activities: ${user.presence.activities.map((a) => a.name).join(', ') || 'None'}
      `);
    if (member) {
      embed.addField('❯ Member Details', stripIndents`
				  • Nickname: ${member.nickname || 'Nope, not today.'}
				  • Roles: ${member.roles.cache.map(roles => roles).join(' ')}
				  • Joined At: ${moment(member.joinedAt).format('L')}
			  `);
    }

    return message.util.send(embed);
  }
}

module.exports = UserCommand;
const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const { SETTINGS, COLORS } = require('../../Constants.js');

class GuildMemberRemoveListener extends Listener {
  constructor() {
    super('guildMemberRemove', {
      emitter: 'client',
      event: 'guildMemberRemove',
    });
  }

  exec(member) {
    const memberlog = this.client.settings.get(member.guild.id, SETTINGS.MEMBERLOG);
    if (memberlog) {
      const channel = member.guild.channels.cache.get(memberlog);
      if (channel) {
        const { user } = member;
        const embed = new MessageEmbed()
          .setColor(COLORS.MEMBER_LEAVE)
          .setAuthor(`${user.tag} (${member.id})`, member.user.displayAvatarURL())
          .setDescription(stripIndents`
            • Profile: ${user.toString()}
            • Created: \`${moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} (GMT)\` (${moment(user.createdAt).fromNow()})
            • Joined: \`${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')} (GMT)\`
          `)
          .setTimestamp(new Date())
          .setFooter('User left');
        channel.send(embed);
      }
    }
  }
}

module.exports = GuildMemberRemoveListener;

const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const { SETTINGS, COLORS } = require('../../Constants.js');

class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd',
    });
  }

  exec(member) {
    const memberlog = this.client.settings.get(member.guild.id, SETTINGS.MEMBERLOG);
    const autoRole = this.client.settings.get(member.guild.id, SETTINGS.AUTO_ROLE);
    if (memberlog) {
      const channel = member.guild.channels.cache.get(memberlog);
      if (channel) {
        const { user } = member;
        const embed = new MessageEmbed()
          .setColor(COLORS.MEMBER_JOIN)
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
          .setDescription(stripIndents`
            • Profile: ${user.toString()}
            • Created: \`${moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} (GMT)\` (${moment(user.createdAt).fromNow()})
            • Joined: \`${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')} (GMT)\`
          `)
          .setTimestamp(new Date())
          .setFooter('User joined');
        channel.send(embed);
      }
    }
    if (autoRole) {
        const role = member.guild.roles.cache.get(autoRole);
        if (role) {
            member.roles.add(role.id).catch((err) => {
                if (err.message !== 'Missing Permissions') {
                    console.log(err);
                }
            });
        }
    }
  }
}

module.exports = GuildMemberAddListener;

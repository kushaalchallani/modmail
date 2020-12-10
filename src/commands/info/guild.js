const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { COLORS } = require('../../Constants.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');

const VERIFICATION_LEVELS = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  VERY_HIGH: 'Very High',
};

class GuildCommand extends Command {
  constructor() {
    super('guild', {
      aliases: ['guild'],
      description: {
        content: 'Get information on a guild.',
      },
      clientPermissions: ['EMBED_LINKS'],
      category: 'info',
    });
  }

  async exec(message) {
    const { guild } = message;
    console.log(guild.verificationLevel);
    const embed = new MessageEmbed()
      .setColor(COLORS.EMBED)
      .setDescription(`Info about **${guild.name}** (ID: ${guild.id})`)
      .setThumbnail(guild.iconURL())
      .addField('❯ Channels', stripIndents`
				• ${guild.channels.cache.filter(ch => ch.type === 'text').size} Text, ${guild.channels.cache.filter(ch => ch.type === 'voice').size} Voice
				• AFK: ${guild.afkChannel ? guild.afkChannel : 'None'}
			`)
      .addField('❯ Member', stripIndents`
				• ${guild.memberCount} members
				• Owner: ${guild.owner.user.tag} (ID: ${guild.ownerID})
			`)
      .addField('❯ Other', stripIndents`
				• Roles: ${guild.roles.cache.size}
				• Region: ${guild.region.replace(/(\b\w)/gi, lc => lc.toUpperCase())}
				• Created at: ${moment(guild.createdAt).format('L')}
				• Verification Level: ${VERIFICATION_LEVELS[guild.verificationLevel]}
			`);

    return message.util.send(embed);
  }
}

module.exports = GuildCommand;
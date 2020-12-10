const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { COLORS } = require('../../Constants.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');

class ChannelCommand extends Command {
  constructor() {
    super('channel', {
      aliases: ['channel'],
      description: {
        content: 'Get information on a channel.',
        usage: '[channel]',
        examples: ['#General', '717862742249439233'],
      },
      clientPermissions: ['EMBED_LINKS'],
      category: 'info',
      args: [
        {
          id: 'channel',
          match: 'content',
          type: 'channel',
          default: (message) => message.channel,
        },
      ],
    });
  }

  async exec(message, { channel }) {
    const embed = new MessageEmbed()
      .setColor(COLORS.EMBED)
      .setDescription(`Info about **${channel.name}** (ID: ${channel.id})`)
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .addField('❯ Info', stripIndents`
        • Type: ${channel.type.replace(/(\b\w)/gi, lc => lc.toUpperCase())}
        • Topic ${channel.topic || 'None'}
        • NSFW: ${channel.nsfw ? 'Yup' : 'Nope, no way.'}
        • Creation Date: ${moment.utc(channel.createdAt).format('L')}
      `);

    return message.util.send(embed);
  }
}

module.exports = ChannelCommand;
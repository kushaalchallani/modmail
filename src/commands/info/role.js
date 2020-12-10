const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { COLORS } = require('../../Constants.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');

class RoleCommand extends Command {
  constructor() {
    super('role', {
      aliases: ['role'],
      description: {
        content: 'Gets info on a role.',
        usage: '[role]',
        examples: ['Coltz', '717862005293187172'],
      },
      category: 'info',
      channel: 'guild',
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          id: 'role',
          match: 'content',
          type: 'role',
          default: (message) => message.member.roles.highest,
        },
      ],
    });
  }

  async exec(message, { role }) {
    const embed = new MessageEmbed()
      .setColor(COLORS.EMBED)
      .setDescription(`Info on **${role.name}** (ID: ${role.id})`)
      .setThumbnail(role.guild.iconURL({ dynamic: true, format: 'png' }))
      .addField('❯ Info', stripIndents`
        • Colour: #${role.color.toString(16)}
        • Hoisted: ${role.hoisted ? 'Yup' : 'Nope'}
        • Mentionable: ${role.mentionable ? 'Yes' : 'Absolutely not'}
        • Creation At: ${moment(role.createdAt).format('L')}
      `)
      .addField('❯ Permissions', role.permissions.toArray().map(perm => `• ${this.capitalize(perm.replace(/_/g, ' '))}`));

    return message.util.send(embed);
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  }
}

module.exports = RoleCommand;
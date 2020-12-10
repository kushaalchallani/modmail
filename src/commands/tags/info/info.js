const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

class InfoTagCommand extends Command {
  constructor() {
    super('tag-info', {
      category: 'tags',
      channel: 'guild',
      args: [
        {
          id: 'tag',
          type: 'existingTagOrAlias',
          prompt: {
            start: message => `${message.author}, what tag do you want info on?`,
            retry: (message, provided) => `${message.author}, no tag with the name **${provided.phrase}** exists.`,
          },
        },
      ],
    });
  }

  async exec(message, { tag }) {
    const user = await this.client.users.fetch(tag.user_id);
    const guild = this.client.guilds.cache.get(tag.guild);
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .addField('❯ Name', tag.name)
      .addField('❯ Created By', user ? `${user.tag} (${user.id})` : 'Failed to fetch user.')
      .addField('❯ Guild', guild ? guild.name : 'Failed to fetch guild.')
      .addField('❯ Aliases', tag.aliases.length ? tag.aliases.sort().map(a => `\`${a}\``).join(' ') : 'No aliases.')
      .addField('❯ Uses', tag.uses)
      .addField('❯ Created At', moment(tag.created_at).format('L'));
    if (tag.templated) {
      embed.addField('❯ Templated', 'Yup it\'s templated.');
    }
    if (tag.last_modified_at && tag.last_modified_by) {
      const lastModifiedBy = await this.client.users.fetch(tag.last_modified_by);
      embed.addField('❯ Last Modified At', moment(tag.last_modified_at).format('L'));
      embed.addField('❯ Last Modified By', lastModifiedBy ? `${lastModifiedBy.tag} (${lastModifiedBy.id})` : 'Failed to fetch user.');
    }
    message.channel.send(embed);
  }
}

module.exports = InfoTagCommand;
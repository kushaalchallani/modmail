const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { COLORS } = require('../../../Constants.js');

class ListTagCommand extends Command {
  constructor() {
    super('tag-list', {
      category: 'tags',
      channel: 'guild',
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
    const tags = await this.client.models.tags.find({ guild: message.guild.id });
    if (!tags.length) return message.util.send('This guild dosn\'t have any tags.');
    const embed = new MessageEmbed().setColor(COLORS.EMBED);
    const hoistedTags = tags.filter(tag => tag.hoisted).map(tag => `\`${tag.name}\``).sort().join(' ');
    const userTags = tags.filter(t => t.user_id === user.id).map(t => `\`${t.name}\``).sort().join(' ');
    if (!hoistedTags.length && !userTags.length) return message.util.send('Sorry, nothing to see here.');
    if (hoistedTags.length) embed.addField(`❯ ${message.guild.name} Tags`, hoistedTags);
    if (userTags.length) embed.addField(`❯ ${message.author.username}'s Tags`, userTags);
    message.util.send(embed);
  }
}

module.exports = ListTagCommand;
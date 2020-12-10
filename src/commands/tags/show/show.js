const { Command } = require('discord-akairo');

class ShowTagCommand extends Command {
  constructor() {
    super('tag-show', {
      category: 'tags',
      channel: 'guild',
      args: [
        {
          id: 'name',
          match: 'content',
          type: 'string',
          prompt: {
            start: (message) => `${message.author}, what tag would you like to show?`,
          },
        },
      ],
    });
  }

  async exec(message, { name }, respond = true) {
    const tag = await this.client.models.tags.findOne({ guild: message.guild.id, name: name })
      || await this.client.models.tags.findOne({ guild: message.guild.id, aliases: name });
    if (!tag) {
      if (respond) message.util.send('There is no tag in this guild with this name.');
      return;
    }
    tag.uses++;
    await tag.save();
    return message.util.send(tag.content);
  }
}

module.exports = ShowTagCommand;
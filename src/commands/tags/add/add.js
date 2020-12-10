const { Command } = require('discord-akairo');

class AddTagCommand extends Command {
  constructor() {
    super('tag-add', {
      category: 'tags',
      channel: 'guild',
      args: [
        {
          id: 'name',
          type: 'tagName',
          prompt: {
            start: message => `${message.author}, what should the tag be named?`,
            retry: (message, provided) => `${message.author}, a tag named **${provided.phrase}** already exists.`,
          },
        },
        {
          id: 'content',
          match: 'rest',
          type: 'tagContent',
          prompt: {
            start: message => `${message.author}, what should the content of the tag be?`,
          },
        },
        {
          id: 'template',
          match: 'flag',
          flag: ['--template', '-T'],
        },
        {
          id: 'hoist',
          match: 'flag',
          flag: ['--hoist', '-H'],
        },
      ],
    });
  }

  async exec(message, { name, content, template, hoist }) {
    if (name && name.length >= 1950) {
      return message.util.send('The tag name length can\'t be over 1950 characters.');
    }
    if (content && content.length >= 1950) {
      return message.util.send('The tag content length can\'t be over 1950 characters.');
    }

    if (template) {
      content = content.replace(/\$\{author\}/g, message.author.toString())
        .replace(/\$\{channel\}/g, message.channel.toString())
        .replace(/\$\{guild\}/g, message.guild.toString());
    }

    await new this.client.models.tags({
      guild: message.guild.id,
      user_id: message.author.id,
      name: name,
      content: content,
      created_at: new Date(),
      templated: template,
      hoisted: hoist,
    }).save();

    message.util.send(`Successfully created the tag **${name}**.`);
  }
}

module.exports = AddTagCommand;
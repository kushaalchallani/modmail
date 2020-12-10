const { Command } = require('discord-akairo');

class EditTagCommand extends Command {
  constructor() {
    super('tag-edit', {
      category: 'tags',
      channel: 'guild',
      flags: ['--hoist', '--unhoist', '--template', '--untemplate'],
    });
  }

  *args() {
    // Credits To: https://github.com/Naval-Base/yuudachi/blob/e6b29e96eaca21def434e33094b56e738dc12844/src/bot/commands/tag/edit.ts
    const tag = yield {
      type: 'existingTag',
      prompt: {
        start: (message) => `${message.author}, what tag should we edit?`,
        retry: (message, provided) => `${message.author}, no tag with the name **${provided.phrase}** exists.`,
      },
    };

    const hoist = yield {
      match: 'flag',
      flag: ['--hoist'],
    };

    const unhoist = yield {
      match: 'flag',
      flag: ['--unhoist'],
    };

    const template = yield {
      match: 'flag',
      flag: ['--template'],
    };

    const untemplate = yield {
      match: 'flag',
      flag: ['--untemplate'],
    };

    const content = yield hoist || unhoist || template || untemplate
      ? {
        match: 'rest',
        type: 'tagContent',
      }
      : {
        match: 'rest',
        type: 'tagContent',
        prompt: {
          start: (message) => `${message.author}, what should the new content be?`,
        },
      };

    return { tag, hoist, unhoist, template, untemplate, content };
  }

  async exec(message, { tag, hoist, unhoist, template, untemplate, content }) {
    if (content && content.length >= 1950) {
      return message.util.send('The tag content length can\'t be over 1950 characters.');
    }

    tag.hoisted = (hoist || unhoist) ? hoist : tag.hoisted;
    tag.templated = (template || untemplate) ? template : tag.templated;
    tag.last_modified_by = message.author.id;
    tag.last_modified_at = new Date();
    if (content) tag.content = content;
    tag.content = tag.content.replace(/\$\{author\}/g, message.author.toString())
      .replace(/\$\{channel\}/g, message.channel.toString())
      .replace(/\$\{guild\}/g, message.guild.toString());
    await tag.save();

    return message.util.send(`Successfully edited tag **${tag.name}**.`);
  }
}

module.exports = EditTagCommand;
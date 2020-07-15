const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

        if (!message.guild || message.author.bot) return;

        if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is **\`${this.client.prefix}\`**.\nType **\`${this.client.prefix}help\`** for more info`);

        const prefix = message.content.match(mentionRegexPrefix) ?
            message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

        if(!message.content.startsWith(prefix)) return;
        
    if (message.author.bot) return;
    if(message.channel.type === 'dm') {
      console.log('Inside message Event')
      client.emit('directMessage', message);
    }
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}
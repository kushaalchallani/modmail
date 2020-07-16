const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {

    const mentionRegex = RegExp(`^<@!${client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${client.user.id}> `);

    if (!message.guild || message.author.bot) return;

    if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is **\`${client.DISCORD_BOT_PREFIX}\`**.`);

    const prefix = message.content.match(mentionRegexPrefix) ?
        message.content.match(mentionRegexPrefix)[0] : client.DISCORD_BOT_PREFIX;

    if(!message.content.startsWith(DISCORD_BOT_PREFIX)) return;




    // Checks if the member has a nickname
if(message.member.nickname) {
  // Checks if the member who sent a message is currently set as AFK, if so reset the nickname
    if(message.member.displayName.startsWith("[AFK]")) {
      message.reply("Welcome back!");
      return message.member.setNickname(message.member.displayName.slice(5));
     }
    // Checks if the mentioned member is afk, if so reply with "That user is currently afk!"
    if(message.mentions.members.first().displayName.startsWith("[AFK]")) 
    return message.reply("That user is currently afk!");
  }




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
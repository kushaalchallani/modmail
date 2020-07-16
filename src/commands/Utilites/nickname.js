const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('nickname', 'Changes nickname of a user', ['nick', 'setnick', 'changenick']);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission(["MANAGE_NICKNAME", "ADMINISTRATOR"])) {
        return message.channel.send({embed: {color: "RED", description: "You can't use this command!"}})
      }
      
      let user = message.mentions.users.first()
      if (!user) return message.channel.send({embed: {color: "RED", description: "You need to mention the user!"}});
      
      let nick = args.slice(1).join(" ");
      if (!nick) return message.channel.send({embed: {color: "RED", description: "You need to input the nickname!"}});
      
      let member = message.guild.members.cache.get(user.id);
      
      await member.setNickname(nick).catch(err => message.channel.send({embed: {color: "RED", description: `Error: ${err}`}}));
      return message.channel.send({embed: {color: "GREEN", description: `<a:greentick:712212436924760094> Successfully changed **${user.tag}** nickname to **${nick}**`}});
  }
  }
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('nickname', 'Change nickname', ['n', 'setnick']);
  }

  async run(client, message, args) {
    // You can make a single array to detect the user permissions.
  if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"])) {
    return message.channel.send({embed: {color: "RED", description: "You can't use this command!"}})
  }
  
  let user = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
  if (!user) return message.channel.send({embed: {color: "RED", description: "You need to mention the user!"}});
  
  let nick = args.slice(1).join(" ");
  if (!nick) return message.channel.send({embed: {color: "RED", description: "You need to input the nickname!"}});
  
  let member = message.guild.members.cache.get(user.id);
  
  await member.setNickname(nick).catch(err => message.channel.send({embed: {color: "RED", description: `Error: ${err}`}}));
  return message.channel.send({embed: {color: "GREEN", description: `<a:tick:733258832456843275> Successfully changed **${user.tag}** nickname to **${nick}**`}});
  }
  }
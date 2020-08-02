const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed} = require("discord.js");
const color = require("../../events/message/colors.json")
const db = require('quick.db')

module.exports = class extends BaseCommand {
  constructor() {
    super('warnings', 'get the users warns', ['punishments']);
  }

  async run(client, message, args) {
    
    const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

    if(warnings === null) warnings = 0;

    const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`${message.user.tag}`)
    .setDescription(`${user} has **${warnings}** warning(s)`)
    message.channel.send(embed)



  }
  }
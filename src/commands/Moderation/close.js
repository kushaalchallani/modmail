const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('close', 'closes the mail', []);
  }

  async run(client, message, args) {
      if (!message.member.hasPermission('MANAGE_MESSAGES', 'ADMINISTRATOR')){
        return  message.channel.send("You cannot do that")
    }
    const embed = new Discord.MessageEmbed()
    .setTitle('Mail Closed')
    .setDescription('Mail has been closed.')
    .setTimestamp
    .setFooter("KC's Universe | 582182796626493444", message.client.guilds.cache.get("582182796626493444").iconURL({ dynamic: true, format: 'png' }))
    message.channel.send(embed).then(m => m.delete(5000));
  }
  }
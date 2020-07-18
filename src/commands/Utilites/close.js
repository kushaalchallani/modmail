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
    .setColor(color.green_bright)
    .setDescription('I have cleared all the messages in this channel.')
    .setTimestamp()
    .setFooter("KC's Universe", message.client.guilds.cache.get("582182796626493444").iconURL({ dynamic: true, format: 'png' }))
    message.channel.send(embed).then(m => m.delete({ timeout: 2500}))
    
    message.channel.bulkDelete(100, true)
    .catch(err => message.channel.send(`Something went wrong... ${err}`));
  }
  }
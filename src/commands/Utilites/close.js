const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('close', 'closes the mail', []);
  }

  async run(client, message, args) {
    message.delete()

      if (!message.member.hasPermission('MANAGE_MESSAGES', 'ADMINISTRATOR')){
        return  message.channel.send("You cannot do that")
    }

   message.channel.send(`
    Closing the mail....`).then((msg) => {
          const _ = new Discord.MessageEmbed()
            .setTitle("Closed the mail")
            .setDescription('I have cleared the messages')
            .setColor("BLUE");
          msg.edit(_);
          msg.edit("\u200B");
        })

        await message.delete({ timeout: 2500 });
    
        message.channel.bulkDelete(100, true)

  }
  }
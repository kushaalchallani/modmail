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

    message.channel.send(`
    Closing the mail....`).then((msg) => {
          const _ = new Discord.MessageEmbed()
            .setTitle("Closed the mail")
            .setDescription('I have cleared the messages')
            .setColor("BLUE");
         await msg.edit(_);
         await msg.edit("\u200B");
        }).then(m => m.delete({ timeout: 2500}));
    
    message.channel.bulkDelete(100, true)

  }
  }
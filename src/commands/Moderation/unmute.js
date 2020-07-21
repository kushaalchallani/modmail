const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('unmute', 'closes the mail', []);
  }

  async run(client, message, args) {

    if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(
          "Sorry but you do not have permission to unmute anyone"
        );
      }
  
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("I do not have permission to manage roles.");
      }

      const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please mention the member to who you want to unmute"
      );
    }

    let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
    
    
 if(user.roles.cache.has(muterole)) {
      return message.channel.send("Given User do not have mute role so what i am suppose to take")
    }

    user.roles.remove(muterole)
    
    var embed2 = new Discord.MessageEmbed()
    .setDescription(`<a:tick:733258832456843275> **${user}** has successfully been unmuted! `)
    .setColor(color.green_bright)
    msg.channel.send(embed2);
    await message.channel.send(embed2)

    var embed3 = new Discord.MessageEmbed()
      .setTitle('You were banned!')
      .setColor(color.red_bright)
      .setDescription(`You were unmuted from **${message.guild.name}**. Do not repeat or you will be kicked`);
    
    user.send(embed3)

  }
  }
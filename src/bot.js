require('dotenv').config();
const { Client, MessageAttachment, MessageEmbed, Message } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client();
const ms = require('ms');

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.token);
})();


client.on('message', async message => {


  const db = require('quick.db')

  let afk = new db.table("AFKs"),
  authorStatus = await afk.fetch(message.author.id),
  mentioned = message.mentions.members.first();

  if (mentioned) {
    let status = await afk.fetch(mentioned.id);
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let reason = args.slice(1).join(" ");

    if (status) {
      const embed = new MessageEmbed()
      .setColor('BLUE')
      .setDescription(`**(${mentioned.user.tag})** is currently AFK: **${reason}**`)
      message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    }
  }

  if (authorStatus) {
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setDescription(`**${message.author.tag}** is no longer AFK.`)
      message.channel.send(embed).then(i => i.delete({timeout: 5000}));
      afk.delete(message.author.id)
  }

  let prefix = ">"
  let args = message.content.slice(prefix.length).trim().split(/ +/g);

if (message.content.startsWith(prefix + 'afk')) {
  if(!message.member.hasPermission('MANAGE_MESSAGES', 'ADMINISTRATOR')) return message.reply('You cannot set an AFK Status')

  let reason = args.slice(1).join(" ");

  const status = new db.table("AFKs");
  let afk = await status.fetch(message.author.id);
  const embed = new MessageEmbed().setColor('BLUE')

  if (!afk) {
    embed.setDescription(`**${message.author.tag}**, I have set your AFK Status. Reason: **${reason}**`)
    status.set(message.author.id, args.join(" ") || `AFK`)
  } else {
    embed.setDescription("You are no longer AFK.");
    status.delete(message.author.id);
  }

  message.channel.send(embed)
}
})
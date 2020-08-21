const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = class extends BaseCommand {
  constructor() {
    super('unlockdown', 'Locks a specific channel', ['smute', 'lockserve']);
  }

  async run(client, message, args) {
    message.delete()

     if(!message.member.hasPermission('MANAGE_PERMISSIONS')) return;

     const ignored = new Set(['719507776312705067', '719509490143199263', '732824893321773067', '734650762642194514', '746012452679843930', '732910552090804254', '731008413626007572', '711179704455135234', '707116423431847978', '708575875779526698', '715497905833640036', '708539118573060106', '707209564130377778', '739075416790270012', '727855996436742164', '732229512259174411', '732233471149473802', '732912303401467904', '711489346255061004', '732109836749242438', '732203694455652415', '732903985047928842', '712966958382973010', '720606826768367688', '707122121666723852', '719511109991792732', '739081512246575134', '719507776312705067', '719509490143199263', '716236337946165269', '732824893321773067', '720139588554850365', '727778289330028596', '727779992070783038', '734650392024973332', '734650762642194514' , '727409290163257384'])
     const serverChannels = message.guild.channels.cache.filter(ch => ch.type !== "category")
    
     serverChannels.forEach(channel => {
         if(!ignored.has(channel.id)){
             if(channel.type === 'text'){
                channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null});
                channel.send(`The server is unlocked. Enjoy!`)
             } else if(channel.type === 'voice'){
                channel.updateOverwrite(channel.guild.roles.everyone, { CONNECT: null});
             }
         }
     })

     const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1) + "/"
    + currentdate.getFullYear() + " at "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

     const lockmessage = new MessageEmbed()
     .setColor('#0099ff')
     .setAuthor("Server unlocked", "https://i.imgur.com/XgTHhQ6.png")
     .setDescription(`<a:read:746004477772955718> The server is unlocked.`)
     .setFooter(datetime)
     message.guild.channels.cache.find(ch => ch.name === '🌐┃global-chat').send(lockmessage);
  }
}
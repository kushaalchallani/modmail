require('dotenv').config();
const { Client, MessageAttachment } = require('discord.js');
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

//anti spam starts

const usersMap = new Map();
const LIMIT = 6;
const TIME = 10000;
const DIFF = 3000;
const UNMUTE = 10800000;
const REMOVE = ([
  '707197658007339069',
  '707133063741702166',
  '707133501354541126',
  '708620116291485758',
  '708620116291485758',
  '717660704617791520',
  '717660767922683932',
  '707134101722890250',
  '707630691944366151',
  '717728401334599690',
  '707904015412756493',
  '708591193461882880',
])

client.on('message', message => {
  if(message.author.bot) return;

  if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer} = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    if(difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared Timeout')
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from reset');
      }, TIME);
      usersMap.set(message.author.id, userData);
    }
    else {
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        const role = message.guild.roles.cache.get('715107146127114321')
        message.member.roles.remove(REMOVE)
        message.member.roles.add(role);
        message.channel.send('You have been muted.');
        setTimeout(() => {
          message.member.roles.remove(role);
          message
        }, UNMUTE)
      } else {
        msgCount++;
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map');
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }

  //anti spam ends



//anti swear starts

var array = ['fuck', 'bitch', 'boobs', 'ass', 'tits', 'sex'];

if(!message.member.hasPermission('MANAGE_MESSAGES')){
  if(array.some(w => ` ${message.content.toLowerCase()} `.includes(` ${w}`))){
    message.delete();

    var role2 = message.guild.roles.cache.get('715107146127114321');

    message.member.roles.add(role2)

    setTimeout(async() => {
      message.member.roles.remove(role2)
    }, ms('5m'))
  }
}

var array2 = ['nigga', 'nigger', 'niggah'];

if(!message.member.hasPermission('MANAGE_MESSAGES')){
  if(array2.some(w2 => ` ${message.content.toLowerCase()} `.includes(` ${w2}`))){
    message.delete();

    var role2 = message.guild.roles.cache.get('715107146127114321');

    message.guild.member.ban(array2)
  }
}

})


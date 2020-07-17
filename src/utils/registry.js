
const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('./structures/BaseCommand');
const BaseEvent = require('./structures/BaseEvent');

async function registerCommands(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command();
        client.commands.set(cmd.name, cmd);
        cmd.aliases.forEach((alias) => {
          client.commands.set(alias, cmd);
        });
      }
    }
  }
}

async function registerEvents(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.events.set(event.name, event);
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

const usersMap = new Map();

/*
'id' => {
  msgCount: 0,
  LastMessage: 'message',
  timer: fh()
}

*/

client.on('message', message => {
  if(message.author.bot) return;

  if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    let msgCount = userData.msgCount;
    if(parseInt(msgCount) === 7) {
      const role = message.guild.role.cache.get('715107146127114321')
      message.member.roles.add(role);
      message.channel.send('You have been muted.');
    } else {
      msgCount++;
      userData.msgCount = msgCount;
      usersMap.set(message.author.id, userData);
    }
  }
  else {
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: null
    });
    setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map');
    }, 10000);
  }
})


module.exports = { 
  registerCommands, 
  registerEvents,
};
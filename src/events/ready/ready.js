const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  
    async run (client) {
    //client.user.setActivity("DM to Contact Staff", {type: "PLAYING"});
    console.log(client.user.tag + ' is now online.');

    let statuses = [
      `over ${client.users.cache.size} users!`,
      `#🌐┃global-chat`,
      `DM to Contact Staff`,
    ]

    setInterval(function(){
      let status = statuses[Math.floor(Math.random() * statuses.length)]
      client.user.setActivity("lol", { type: "WATCHING"})
      client.user.setActivity("lol2", { type: "PLAYING"})
  }, 20000)
  }
  
}
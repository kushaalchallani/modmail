const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  
    async run (client) {
    //client.user.setActivity("DM to Contact Staff", {type: "PLAYING"});
    console.log(client.user.tag + ' is now online.');

    let statuses = [
      client.user.setActivity(`over ${client.users.cache.size} users!`, { type: "WATCHING"}),
      client.user.setActivity(`#🌐┃global-chat`, { type: "PLAYING"})
    ]

    setInterval(function(){
      let status = statuses[Math.floor(Math.random() * statuses.length)]
  }, 5000)
  }
  
}
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  
    async run (client) {
    console.log(client.user.tag + ' is now online.');

    let statuses = [ 
      {name: "KC's Universe", options: { type: "WATCHING" }}, 
      { name: "DM to contact staff", options: { type: "PLAYING" }},
      { name: "Valorant", options: { type: "PLAYING" }},
      { name: "KC Playz's Videos", options: { type: "WATCHING" }},
      { name: "Gogeta", options: { type: "LISTENING" }},
      { name: "🌐┃global-chat", options: { type: "STREAMING", URL: 'https://www.youtube.com/c/kcplayz' }},
      { name: "Rainbow 6 Siege", options: { type: "PLAYING" }},

    ]

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status.name, status.options);
    }, 5000);
  }
  
}
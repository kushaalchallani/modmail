const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  
    async run (client) {
    console.log(client.user.tag + ' is now online.');

    let statuses = [ 
      { name: "KC's Universe", options: { type: "WATCHING" }}, 
      { name: "DM to contact staff", options: { type: "PLAYING" }},
      { name: "Valorant", options: { type: "PLAYING" }},
      { name: "KC Playz's Videos", options: { type: "WATCHING" }},
      { name: "KC Playz", options: { type: "LISTENING" }},
      { name: "the spammers", options: { type: "WATCHING" }},
      { name: "#🌐┃global-chat", options: { type: "STREAMING", URL: 'https://www.twitch.tv/kcplayzyt' }},
      { name: "giveaways", options: { type: "WATCHING"}},
      { name: "#🌐┃global-chat", options: { type: "WATCHING"}},
      { name: "KC Playz's Stream", options: { type: "WATCHING"}},
      { name: "the latest news", options: { type: "LISTENING"}},
      { name: "everyone", options: { type: "WATCHING"}},
      { name: `${client.users.cache.size}`, options: { type: "WATCHING"}},
      { name: "Rainbow 6 Siege", options: { type: "PLAYING" }},

    ]

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status.name, status.options);
    }, 20000);
  }
  
}
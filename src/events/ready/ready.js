const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  
    async run (client) {
    console.log(client.user.tag + ' is now online.');

    let statuses = [ {name: "lol", options: { type: "WATCHING" }}, { name: "lol2", options: { type: "PLAYING" }}]

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status.name, status.options);
    }, 5000);
  }
  
}
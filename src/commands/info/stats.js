const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { COLORS } = require('../../Constants.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
require('moment-duration-format');

class StatsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      description: {
        content: 'Displays statistics about the bot.',
      },
      category: 'info',
      channel: 'guild',
      clientPermissions: ['EMBED_LINKS'],
    });
  }

  async exec(message) {
    const embed = new MessageEmbed()
      .setColor(COLORS.EMBED)
      .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
      .addField('❯ Uptime', moment.duration(this.client.uptime).format('d [days] h [hrs] m [mins] s [secs]'), true)
      .addField('❯ Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
      .addField('❯ General Stats', stripIndents`
        • Guilds: ${this.client.guilds.cache.size}
        • Channels: ${this.client.channels.cache.size}
       `, true)
      .addField('❯ API Ping', `${this.client.ws.ping} ms`, true)
      .addField('❯ Source Code', '[View Here](https://github.com/iColtz/Yakumo)', true)
      .addField('❯ Library', '[discord.js](https://discord.js.org/#/)[-akairo](https://discord-akairo.github.io/#/)', true)
      .setFooter(`2020 © ${this.client.users.cache.get(this.client.config.ownerID).tag}`);

    return message.util.send(embed);
  }
}

module.exports = StatsCommand;
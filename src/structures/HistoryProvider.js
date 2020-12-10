const { Provider } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');
const { COLORS } = require('../Constants.js');

class HistoryProvider extends Provider {
  constructor(model) {
    super();

    this.model = model;
  }

  async add(guild, user, key) {
    const doc = await this.getDocument(guild, user);
    if (!doc.history[key]) doc.history[key] = 0;
    doc.history[key] += 1;
    doc.markModified('history');
    return doc.save();
  }

  async getDocument(guild, user) {
    const obj = await this.model.findOne({ guild: guild.id, user_id: user.id });
    if (!obj) {
      const newDoc = await new this.model({ guild: guild.id, user_id: user.id, history: {} }).save();
      return newDoc;
    }

    return obj;
  }

  async embed(guild, user) {
    const doc = await this.model.findOne({ guild: guild.id, user_id: user.id });
    const { history } = doc || {};
    const { kick, ban, softban } = history || {};

    return new MessageEmbed()
      .setColor(COLORS.EMBED)
      .setAuthor(`${user.tag} (${user.id})`, user.displayAvatarURL({ format: 'png', dynamic: true }))
      .setDescription(oneLine`Softbans ${softban || 0}, ${kick || 0} kicks and ${ban || 0} bans.`);
  }
}

module.exports = HistoryProvider;
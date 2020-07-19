const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");
const ms = require('ms')
const { MessageEmbed } = require('discord.js');
const color = require("../../events/message/colors.json")

module.exports = class extends BaseCommand {
  constructor() {
    super('ban', 'Clears the Messages', ['b']);
  }

  async run(client, message, args) {
    
  }
  }
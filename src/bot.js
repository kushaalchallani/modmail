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

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://kcplayz:rakshaa02@cluster0.k0uop.mongodb.net/Data?retryWrites=true&w=majority",{
  useUnifiedTopology: true,
  useNewUrlParser: true,
})



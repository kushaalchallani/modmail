
const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const DESTINATION = '727409290163257384';
const openedTickets = new Map();
const ACCEPT = '726811981474037841';
const REJECT = '726811981587284038'

module.exports = class DirectMessageEvent extends BaseEvent {
  constructor() {
    super('directMessage');
  }
  
  async run(client, message) {
      console.log('Inside DM Event');
          if (!openedTickets.has(message.author.id)) {
              message.channel.send(`Hello, We have received you message. Please wait momentarily while one of our staff will het back to you.`);
              openedTickets.set(message.author.id, message.guild);
              const channel = client.channels.cache.get(DESTINATION);
              if (channel) {
                  const embed = new MessageEmbed()
                    .setTitle('New Modmail Message')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription(message.content);
                    const msg = await channel.send(embed);
                    await msg.react(ACCEPT);
                    await msg.react(REJECT);

                    try{
                        const reactionFilter = (reaction, user) => [ACCEPT, REJECT].includes(reaction.emoji.id) && !user.bot;
                        const reactions = await msg.awaitReactions(reactionFilter, { max: 1, time: 3600000, errors: ['time'] });
                        const choice = reactions.get(ACCEPT) || reactions.get(REJECT);
                        if (choice.emoji.id === ACCEPT) {
                            await handleCollector(channel, message);
                            message.channel.send("Thank you for using KC's ModMail. Fell free to reachout later or create a ticket at <#716221404521168896>");
                            openedTickets.delete(message.author.id);
                        } else if (choice.emoji.id === REJECT) {
                            message.author.send('Your message was rejected. You may try again later');
                            setTimeout(() => {
                                openedTickets.delete(message.author.id);
                            }, 10000);
                        }
                    } catch (err) {
                        console.log(err);
                        message.author.send("No one was available to accept your query. Please try again");
                        openedTickets.delete(message.author.id);
                    }

              }else {
                  message.channel.send(`Something went wrong... Please reach out to a server staff directly.`);
                  openedTickets.delete(message.author.id);
              }
          }
      }
  }

  function handleCollector(channel, message) {

    const filter = m => m.author.id === message.author.id;
    const dmCollector = message.channel.createMessageCollector(filter);

    const guildCollectorFilter = m => m.channel.id  === channel.id && !m.author.bot;
    const guildChannelCollector = channel.createMessageCollector(guildCollectorFilter);

    return new Promise((resolve, reject) => {
        dmCollector.on('collect', m => {
            const files = getAttachmentLinks(m.attachments);
            channel.send(`[${m.author.tag} (${m.author.id})]: ${m.content}`, {
                files
            });
        });
        guildChannelCollector.on('collect', m => {
            if (m.content.toLowerCase() === '--close') {
                guildChannelCollector.stop();
                dmCollector.stop();
                resolve();
            } else {
                const files = getAttachmentLinks(m.attachments);
                message.author.send(`[${m.author.tag} (${m.author.id})]: ${m.content}`, {
                    files
                });
            }
        });
    });
  }

  function getAttachmentLinks(attachments) {
      const valid = /^.*(gif|png|jpg|jpeg)$/g
      return attachments.array()
        .filter(attachment => valid.test(attachment.url))
        .map(attachment => attachment.url);
  }
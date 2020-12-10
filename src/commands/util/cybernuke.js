const { Command, Argument } = require('discord-akairo');
const { stripIndents } = require('common-tags');

class LaunchCybernukeCommand extends Command {
  constructor() {
    super('cybernuke', {
      aliases: ['cybernuke'],
      description: {
        content: 'Bans all members that have joined recently, with new accounts.',
      },
      category: 'util',
      userPermissions: ['MANAGE_GUILD'],
      clientPermissions: ['BAN_MEMBERS'],
      args: [
        {
          id: 'join',
          type: Argument.range('number', 0.1, 120, true),
          prompt: {
            start: (message) => `${message.author}, how old (in minutes) should a member be for the cybernuke to ignore them (server join date)?`,
            retry: (message) => `${message.author}, the minimum is \`0.1\` and the maximum \`120\` minutes.`,
          },
        },
        {
          id: 'age',
          type: Argument.range('number', 0.1, Infinity, true),
          prompt: {
            start: (message) => `${message.author}, how old (in minutes) should a member's account be for the cybernuke to ignore them (account age)?`,
            retry: (message) => `${message.author}, the minimum is \`0.1\` minutes.`,
          },
        },
      ],
    });
  }

  async exec(message, { join, age }) {
    // Credits To: https://github.com/Naval-Base/yuudachi/blob/e6b29e96eaca21def434e33094b56e738dc12844/src/bot/commands/util/cybernuke.ts
    const guild = message.guild;
    await message.util.send('Calculating targeting parameters for cybernuke...');
    await guild.members.fetch();

    const memberCutoff = Date.now() - join * 60000;
    const ageCutoff = Date.now() - age * 60000;
    const members = guild.members.cache.filter(
      member => (member.joinedTimestamp || 0) > memberCutoff && member.user.createdTimestamp > ageCutoff,
    );

    await message.util.send(`Cybernuke will strike ${members.size} members; proceed?`);
    let statusMessage;

    const responses = await message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {
      max: 1,
      time: 10000,
    });

    if (responses.size !== 1) {
      await message.reply('Cybernuke cancelled.');
      return null;
    }
    const response = responses.first();

    if (/^y(?:e(?:a|s)?)?$/i.test(response.content || '')) {
      statusMessage = await response.reply('Launching cybernuke...');
    }
    else {
      await response.reply('Cybernuke cancelled.');
      return null;
    }

    const fatalities = [];
    const survivors = [];
    const promises = [];

    for (const member of members.values()) {
      promises.push(
        member.send(stripIndents`
					Sorry, but you've been automatically targetted by the cybernuke in the **${guild.name}** server.
					This means that you have been banned, likely in the case of a server raid.
					Please contact them if you believe this ban to be in error.
				`)
          .catch((error) => console.log(error))
          .then(async () => member.ban({ days: 7, reason: 'Cybernuke!' }))
          .then(() => {
            fatalities.push(member);
          })
          .catch((err) => {
            console.log(err);
            survivors.push({
              member,
              error: err,
            });
          })
          .then(async () => {
            if (members.size <= 5) return;
            if (promises.length % 5 === 0) {
              await statusMessage.edit(
                `Launching cyber nuke (${Math.round((promises.length / members.size) * 100)}%)...`,
              );
            }
          }),
      );
    }

    await Promise.all(promises);
    await statusMessage.edit('Cybernuke impact confirmed. Casuality report incoming...');
    await response.reply(
      stripIndents`
			__**Fatalities:**__
			${fatalities.length > 0
          ? stripIndents`
					${fatalities.length} confirmed KIA.
					${fatalities.map(fat => `**-** ${fat.displayName} (${fat.id})`).join('\n')}
				`
          : 'None'
        }
			${survivors.length > 0
          ? stripIndents`
					__**Survivors**__
					${survivors.length} left standing.
					${survivors.map(srv => `**-** ${srv.member.displayName} (${srv.member.id}): \`${srv.error}\``).join('\n')}
				`
          : ''
        }
		`,
      { split: true },
    );

    return null;
  }
}

module.exports = LaunchCybernukeCommand;
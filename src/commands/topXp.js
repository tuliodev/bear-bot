// Embed
const { MessageEmbed } = require('discord.js');

// Mongoose models
const User = require('../database/Models/User');

module.exports = {
  name: 'topxp',
  description: 'Command to show top xp',

  async execute(message, args) {
    const filterXpTop = await User.find();

    if (!filterXpTop) {
      return console.log('Error on filterXpTop');
    }

    const serializedXpTop = filterXpTop.map((userXp) => ({
      name: userXp.name,
      xp: userXp.xp,
    }));

    const sortedXpTop = serializedXpTop.sort((a, b) => b.xp - a.xp);

    const serializedResult = serializedXpTop.map((userXp) => `${userXp.name} XP: **${userXp.xp}**`);

    const finalResult = [serializedResult[0], serializedResult[1], serializedResult[3], serializedResult[4], serializedResult[5], serializedResult[6]];

    const embed = new MessageEmbed()
      .setTitle(':bear: Top 10 xp')
      .setColor(0xff0000)
      .setDescription(finalResult)
      .setThumbnail('https://media.discordapp.net/attachments/441025017241665556/823272441190416384/bearbot2.png');

    return message.channel.send(embed);
  },
};

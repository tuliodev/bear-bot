// Embed
const { MessageEmbed } = require('discord.js');

// Mongoose models
const User = require('../database/Models/User');

module.exports = {
  name: 'profile',
  description: 'Profile command',
  async execute(message, args) {
    const member = message.mentions.users.first() || message.author;
    const avatar = member.displayAvatarURL();

    const userDiscordId = member.id;

    const findUserById = await User.findOne({ discord_id: userDiscordId });

    if (!findUserById) {
      const embed = new MessageEmbed()
        .setTitle('Bear bot - Sistema de nível')
        .setColor(0xff0000)
        .setDescription('Nenhum usuário encontrado')
        .setThumbnail('https://media.discordapp.net/attachments/441025017241665556/823272441190416384/bearbot2.png');

      return message.channel.send(embed);
    }

    const embed = new MessageEmbed()
      .setTitle(':bear:  Informações do perfil')
      .setColor(0xff0000)
      .setDescription(`**- Nome** ${member.username} \n **- Nível:** ${findUserById.level}\n **- Xp:** ${findUserById.xp} \n** - Avatar:**`)
      .setImage(avatar);

    return message.channel.send(embed);
  },
};

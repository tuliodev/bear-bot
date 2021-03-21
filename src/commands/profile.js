const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'profile',
  description: 'Profile command',
  execute(message, args) {
    const member = message.mentions.users.first() || message.author;
    const avatar = member.displayAvatarURL();

    const embed = new MessageEmbed()
      .setTitle(member.username)
      .setColor(0xff0000)
      .setDescription('Avatar do usuário:')
      .setImage(avatar);

    return message.channel.send(embed);
  },
};

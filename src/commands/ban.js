// Embed
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban command',
  async execute(message, args) {
    if (message.member.roles.cache.has('823211691545591868')) {
      if (!args[0]) {
        const embed = new MessageEmbed()
          .setTitle(':bear:  Sistema Administrativo')
          .setColor(0xff0000)
          .setDescription('Porfavor mencione o usuário que quer banir do discord')
          .setThumbnail('https://media.discordapp.net/attachments/441025017241665556/823272441190416384/bearbot2.png');

        return message.channel.send(embed);
      }
      const userBanned = message.mentions.users.first();
      const targetMember = message.guild.members.cache.get(userBanned.id);
      targetMember.ban();
      const embed = new MessageEmbed()
        .setTitle(':bear:  Sistema Administrativo')
        .setColor(0xff0000)
        .setDescription(`Usuário ${userBanned.username} banido com sucesso por ${message.author.username}`)
        .setThumbnail('https://media.discordapp.net/attachments/441025017241665556/823272441190416384/bearbot2.png');

      return message.channel.send(embed);
    }
    return message.reply('Você não tem permissão de administrador');
  },
};

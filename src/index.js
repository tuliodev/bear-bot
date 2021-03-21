// Discord
const Discord = require('discord.js');
// Libs
const fs = require('fs');
// Config
const {
  token, prefix, xpSystemConfig, uriDatabase,
} = require('./config/config.json');
// Client
const client = new Discord.Client();
// Mongoose
const mongoose = require('mongoose');
// Mongoose models
const User = require('./database/Models/User');
// Commands
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter((file) => file.endsWith('.js'));

// Turning on the bot
client.once('ready', () => {
  console.log('Bear bot online!');
});

// Database connection
mongoose.connect(uriDatabase, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Banco de dados conectado!!');
});

// Command handler

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix)) {
    const userData = {
      discord_id: message.author.id,
      name: message.author.username,
      coins: 0,
      xp: 0,
      level: 0,
    };

    const findUserById = await User.findOne({ discord_id: userData.discord_id });

    if (!findUserById) {
      if (!message.author.bot) {
        const user = await User.create(userData);
        return;
      }
      return;
    }

    // Level up system
    let newXp = findUserById.xp;
    let newLevel = findUserById.level;

    await User.findOneAndUpdate({ discord_id: findUserById.discord_id }, { xp: newXp += xpSystemConfig.xpPerMessage });

    // Level 1
    if (newXp === 100) {
      await User.findOneAndUpdate({ discord_id: findUserById.discord_id }, { level: newLevel += 1 });
      const embed = new Discord.MessageEmbed()
        .setTitle('Bear Bot - Sistema de nível')
        .setColor(0xff0000)
        .setThumbnail('https://media.discordapp.net/attachments/441025017241665556/823272441190416384/bearbot2.png')
        .setDescription(`Parabéns ${message.member.user} Você acabou de subir de nível, nível atual: 1`);

      return message.channel.send(embed);
    }
    // Level 2
    if (newXp === 200) {
      await User.findOneAndUpdate({ discord_id: findUserById.discord_id }, { level: newLevel += 1 });
      const embed = new Discord.MessageEmbed()
        .setTitle('Bear Bot - Sistema de nível')
        .setColor(0xff0000)
        .setThumbnail('https://media.discordapp.net/attachments/441025017241665556/823272441190416384/bearbot2.png')
        .setDescription(`Parabéns ${message.member.user} Você acabou de subir de nível, nível atual: 2`);

      return message.channel.send(embed);
    }
  }

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Teve um problema ao executar o comando!');
  }
});

client.login(token);

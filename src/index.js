// Discord
const Discord = require('discord.js');
// Libs
const fs = require('fs');
// Config
const { token, prefix } = require('./config/config.json');
// Client
const client = new Discord.Client();
// Mongoose
const mongoose = require('mongoose');
// Commands
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter((file) => file.endsWith('.js'));

// Turning on the bot
client.once('ready', () => {
  console.log('Bear bot online!');
});

// Database connection
const uri = 'mongodb+srv://tulio:tulio123@cluster0.o45dd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Banco de dados conectado!!!');
});

// Command handler

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
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

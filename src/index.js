const Discord = require('discord.js');

const { config, prefix } = require('./config/config.json');

const client = new Discord.Client();

client.login(token);

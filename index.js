const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MESSAGES] });
const environment = require('dotenv').config({path: __dirname + '/.env'})

client.on('ready', () => {
    console.log("Bot started and running!");
})

client.login(process.env.token);
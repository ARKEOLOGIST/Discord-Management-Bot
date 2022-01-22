const Discord = require('discord.js');
const mongoose = require('mongoose');
const handler = require('./deploy');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MESSAGES] });
const environment = require('dotenv').config({path: __dirname + '/.env'})

client.on('ready', async () => {
    await mongoose.connect(process.env.MONGO_URI || '', {
        keepAlive: true,
    });
    
    handler(client);
    console.log("Bot started and running!");
})

client.login(process.env.TOKEN);
const Discord = require('discord.js');
const mongoose = require('mongoose');
const express = require('express');

const handler = require('./deploy');
const alive = require('./server');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.GUILD_MESSAGES] });
const environment = require('dotenv').config({path: __dirname + '/.env'})

client.on('ready', async () => {
    await mongoose.connect(process.env.MONGO_URI || '', {
        keepAlive: true,
    });
    
    handler(client);
    console.log("Bot started and running!");
})

alive();

client.login(process.env.TOKEN);
const Discord = require('discord.js');

module.exports = {
    callback: (message, ...args) => {
        message.reply('Welcome!');
    }
}
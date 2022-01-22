const Discord = require('discord.js');
const fs = require('fs');
const getFiles = require('./getFiles');

module.exports = (client) => {
    const commands = {};
    
    const commandFiles = getFiles('./commands','.js');

    for (const command of commandFiles)
    {
        let commandFile = require(command);
        const split = command.replace(/\\/g,'/').split('/');
        const commandName = split[split.length - 1].replace('.js','');

        commands[commandName.toLowerCase()] = commandFile;
    }

    client.on('messageCreate', (message) => {
        if (message.author.bot || !message.content.startsWith('!'))
        {
            return;
        }

        const args = message.content.slice(1).split(/ +/);
        let commandName;
        try {
            commandName = args.shift().toLowerCase();
        }
        catch (e) {
            message.reply('No arguments specified!');
        }

        if (!commands[commandName]) 
        {
            message.reply('Command not found, please use !help to see the list of commands');
            return;
        }

        try {
            commands[commandName].callback(message, ...args);
        } catch (e) {
            console.error(e);
            message.reply('An unknown error occurred!');
        }
    })
}
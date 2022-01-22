const Discord = require('discord.js');
const schema = require('../schema/schema');

module.exports = {
    callback: async (message, ...args) => {
        let game_name = "";
        for (const arg of args) {
            if (arg.charAt(arg.length - 1) == "\"")
            {
                game_name += arg;
            }
            else
            {
                game_name += arg;
                game_name += " ";
            }
        }
        game_name = Buffer.from(game_name,'utf-8').toString();
        game_name = game_name.replace(/["]+/g, '');
        let existing_game;
        try {
            existing_game = await schema.findOne({ name: game_name });
        } catch (e)
        {
            console.error(e);
            message.reply('An unexpected error occurred!');
        }
        message.reply(`${game_name} has been assigned to ${existing_game.reviewer}!`);
    }
}
const Discord = require('discord.js');
const schema = require('../schema/schema');

module.exports = {
    callback: async (message, ...args) => {
        let game_name = "";
        let user_name = "";
        let count = 0;
        for (const arg of args) {
            if (arg.charAt(arg.length - 1) == "\"" && count == 0)
            {
                game_name += arg;
                count++;
            }
            else if (arg.charAt(arg.length - 1) == "\"" && count == 1)
            {
                user_name += arg;
                count++;
            }
            else if (arg.charAt(arg.length - 1) != "\"" && count == 0)
            {
                game_name += arg;
                game_name += " ";
            }
            else if (arg.charAt(arg.length - 1) != "\"" && count == 1)
            {
                user_name += arg;
                user_name += " ";
            }
        }
        let existing_game;
        try {
            existing_game = await schema.findOne({ name: game_name });
        } catch (e)
        {
            console.error(e);
            message.reply('An unexpected error occurred!');
        }
        if (existing_game)
        {
            const game_temp = game_name.replace(/['"]+/g, '');
            const reviewer_temp = existing_game.reviewer.replace(/['"]+/g, '');
            message.reply(`${game_temp} has already been claimed by ${reviewer_temp}!`);
        }
        else
        {
            game_name = Buffer.from(game_name,'utf-8').toString();
            user_name = Buffer.from(user_name,'utf-8').toString();
            game_name = game_name.replace(/["]+/g, '');
            user_name = user_name.replace(/["]+/g, '');
            const game_assignment = new schema({
                name: game_name,
                reviewer: user_name
            });
            try {
                existing_game = await game_assignment.save();
            } catch (e)
            {
                console.error(e);
                message.reply('An unexpected error occurred!');
            }
            message.reply(`${game_name} is now assigned to ${user_name}!`);
        }
    }
}
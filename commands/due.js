const Discord = require('discord.js');
const schema = require('../schema/schema');

module.exports = {
    callback: async (message, ...args) => {
        let game_name = "";
        let due_date = "";
        let count = 0;
        for (const arg of args) {
            if (arg.charAt(arg.length - 1) == "\"" && count == 0)
            {
                game_name += arg;
                count++;
            }
            else if (arg.charAt(arg.length - 1) == "\"" && count == 1)
            {
                due_date += arg;
                count++;
            }
            else if (arg.charAt(arg.length - 1) != "\"" && count == 0)
            {
                game_name += arg;
                game_name += " ";
            }
            else if (arg.charAt(arg.length - 1) != "\"" && count == 1)
            {
                due_date += arg;
                due_date += " ";
            }
        }
        game_name = Buffer.from(game_name,'utf-8').toString();
        due_date = Buffer.from(due_date,'utf-8').toString();
        game_name = game_name.replace(/["]+/g, '');
        due_date = due_date.replace(/["]+/g, '');
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
            if (existing_game.due_date)
            {
                const game_temp = game_name.replace(/['"]+/g, '');
                const due_date_temp = existing_game.due_date.replace(/['"]+/g, '');
                message.reply(`The review for ${game_temp} is already set to be ${due_date_temp}!`);
            }
            else
            {
                const game_temp = game_name.replace(/['"]+/g, '');
                const due_date_temp = due_date.replace(/['"]+/g, '');
                try {
                    existing_game.due_date = due_date_temp;
                    existing_game = await existing_game.updateOne({ due_date: due_date_temp });
                    message.reply(`The review for ${game_temp} should be ready by ${due_date_temp}!`);
                } catch (e)
                {
                    console.error(e);
                    message.reply('An unexpected error occurred!');
                }
            }
        }
        else
        {
            const game_assignment = new schema({
                name: game_name,
                reviewer: due_date
            });
            try {
                existing_game = await schema.create(game_assignment);
                message.reply(`${game_name} is now assigned to ${due_date}!`);
            } catch (e)
            {
                console.error(e);
                message.reply('An unexpected error occurred!');
            }     
        }
    }
}
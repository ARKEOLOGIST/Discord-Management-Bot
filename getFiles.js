const fs = require('fs');

const getFiles = (dir) => {
    const files = fs.readdirSync(dir, {
        withFileTypes: true,
    });

    let commandFiles = [];

    for (const file of files)
    {
        if (file.isDirectory())
        {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`),
            ];
        } else if (file.name.endsWith('.js'))
        {
            commandFiles.push(`${dir}/${file.name}`);
        }
    }

    return commandFiles;
}

module.exports = getFiles;
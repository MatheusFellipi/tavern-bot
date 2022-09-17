const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync('./src/commands');
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'));

      const { commands, commandArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Command: ${command.data.name} has been registered`);
      }
    }
    const CLIENT_ID = '1020487724777615430';
    const GUILD_ID = '1020298551642837023';

    const rest = new REST({ version: '9' }).setToken(
      process.env.DISCORD_BOT_TOKEN
    );

    try {
      console.log('started refreshing application (/) commands');
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: client.commandArray,
      });
      console.log('Successfully reloaded application (/) commands');
    } catch (error) {
      console.error(error);
    }
  };
};

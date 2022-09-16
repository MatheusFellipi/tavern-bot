require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on('ready', (re) => {
  // console.log(re, 'bot');
  console.log(client.user.tag, 'has logged in.');
});


client.login(process.env.DISCORD_BOT_TOKEN);

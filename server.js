require('dotenv').config();
const Discord = require('discord.js');

const roles = require('./commands/roles');

const client = new Discord.Client();

client.on('ready', () => {
  client.user.setPresence({ activity: { name: process.env.PLAYING, type: 'PLAYING' } });
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.name === 'guild-request') {
    if (msg.content.includes('!add')) {
      roles.addMember(msg);
    }
    if (msg.content.includes('!remove')) {
      roles.removeMember(msg);
    }
  }
});

client.login(process.env.TOKEN).catch(console.log);

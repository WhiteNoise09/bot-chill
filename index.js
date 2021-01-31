const Discord = require('discord.js');
const fs      = require('fs');

const client = new Discord.Client();
global.client = client;

client.commands = new Map();

fs.readdirSync('./events').forEach(file => {
    const event = require(`./events/${file}`);
    
    event.once ?
    client.once(event.type, event.callback) :
    client.on(event.type, event.callback);
});

client.login('ODA1NTAxMjk1ODEyOTM1Njkx.YBbzig.lDdg5ElqbAWvfav1WJDyunFcZ-c');
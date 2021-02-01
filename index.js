const config  = require('./config.json');
const fs      = require('fs');

fs.readdirSync('./node_modules').forEach(console.log);
fs.readdirSync('./node_modules/discord.js').forEach(console.log);

const Discord = require('./node_modules/discord.js');

const client = new Discord.Client();
client.commands = new Map();

global.client = client;
global.config = config;
global.MessageEmbed = Discord.MessageEmbed;

fs.readdirSync('./events').forEach(file => {
    const event = require(`./events/${file}`);
    
    event.once ?
    client.once(event.type, event.callback) :
    client.on(event.type, event.callback);
});

fs.readdirSync('./commands').forEach(file => {
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
});

// pour éviter d'avoir à envoyer le token sur github et me faire engueuler par discord H24
if(!('TOKEN' in process.env)) process.env.TOKEN = require('./local-token.json').token;

client.login(process.env.TOKEN);
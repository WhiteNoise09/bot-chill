const Discord = require('discord.js');
const ED      = require('ecoledirecte');
const fs      = require('fs');
const config  = require('./config.json');

const ed_client = new ED.Client();

const client = new Discord.Client();
client.commands = new Discord.Collection();

// variables globales
global.client       = client;
global.ed_client    = ed_client;
global.config       = config;
global.MessageEmbed = Discord.MessageEmbed;
global.embed        = 
function (strings, ...values) {
    let string = '';

    strings.forEach((subString, index) => {
        string += subString + `${values[index] ?? ''}`;
    });

    return new MessageEmbed()
        .setColor(config.embedColor)
        .setDescription(string);
}

fs.readdirSync('./events').forEach(file => {
    const event = require(`./events/${file}`);
    
    event.once ?
    client.once(event.type, event.callback) :
    client.on(event.type, event.callback);

    console.log(`logged '${event.type}' event from ${file}`);
});

fs.readdirSync('./commands', { withFileTypes: true }).forEach(file => {
    if(file.isFile()) {
        const command = require(`./commands/${file.name}`);
    
        client.commands.set(command.name, command);

        console.log(`cached '${command.name}' command from ${file.name}`);
    }
    else if(file.isDirectory()) {
        const dirName = file.name;
        const commandNamespace = require(`./commands/${dirName}`);
        commandNamespace.isNamespace = true;
        commandNamespace.options = [];

        fs.readdirSync(`./commands/${dirName}`).forEach(file => {
            if(file === "index.js") return;

            const command = require(`./commands/${dirName}/${file}`);
            command.type = 'sub_command';

            commandNamespace.options.push(command);

            console.log(`cached '${command.name}' sub_command of ${commandNamespace.name} from ${file}`);
        });

        client.commands.set(commandNamespace.name, commandNamespace);

        console.log(`cached '${commandNamespace.name}' commands namespace from ${file.name}`);
    }
});

// pour éviter d'avoir à envoyer le token sur github et me faire engueuler par discord H24
if(!('TOKEN' in process.env)) process.env.TOKEN = require('./local-token.json').token;

// pour éviter d'envoyer mes identifiants ED sur github
if(!('ED_USERNAME' in process.env)) process.env.ED_USERNAME = require('./local-ed-credentials').username;
if(!('ED_PASSWORD' in process.env)) process.env.ED_PASSWORD = require('./local-ed-credentials').password;

client.login(process.env.TOKEN);

// ED

ed_client.on('ready', () => {
    console.log('Connected to ED\'s private api (with my own module) !')
});

ed_client.login(process.env.ED_USERNAME, process.env.ED_PASSWORD);
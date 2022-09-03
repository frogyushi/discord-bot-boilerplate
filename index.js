const { sync } = require('fast-glob');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// getting our token as _token since we're privitizing this variable
// https://marcusnoble.co.uk/2018-02-04-private-variables-in-javascript/
const { token: _token } = require('./config.json');

const client = new Client({
    // setting our intents as this is needed
    // we're setting up our intentions on what events we want to listen for
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
    ],
});

const commands = [];
client.commands = new Collection();

// creating our command handler, we're using <sync> function to get our commands
for (const cmd of sync('./commands/*.js')) {
    const command = require(cmd);
    commands.push(command);
    client.commands.set(command.name, command);
}

// same story for events
for (const evt of sync('./events/*.js')) {
    const event = require(evt);

    // we're using <client>.on to attach events to our client
    client.on(event.name, (...args) => {
        event.run(client, ...args);
    });
}

client.on('ready', () => {
    client.application.commands.set(commands).then(() => {
        console.log('our commands are set and active :)');
    });
});

// and then, logging in :)
client.login(_token);

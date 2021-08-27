const { Client, Collection } = require('discord.js');
const bot = new Client();
const { readdirSync } = require('fs');
const { token } = require('./secret.json');

const events = readdirSync('./events')
for (const event of events) {
    const eventFile = require(`./events/${event}`);
    bot.on(eventFile.name, (param1, param2) => eventFile.execute(bot, param1, param2));
}

bot.commands = new Collection();
const commands = readdirSync('./commands')
for (const command of commands) {
    const commandFile = require(`./commands/${command}`);
    bot.commands.set(commandFile.name, commandFile);
}

bot.login(token);
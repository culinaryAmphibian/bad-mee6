const servers = require('../db/servers.json');

function aliases({name}) {
    if ((typeof name != 'object') || (name.length == 1)) return 'none';
    if (name.length == 2) return name[1];
    return `${name.slice(1, -1).join(', ')}, and ${name[name.length - 1]}`;
}

module.exports = {
    name: ['help'], description: 'send a list of bot commands or more information on a specific command', 
    usage: '[pref]help ?<command>',
    execute(message, args, bot) {
        const {prefix} = servers[message.guild.id];
        if (args[1]) {
            let command = bot.commands.find(x => (typeof x.name == 'string' && args[1] == x.name) || (typeof x.name == 'object' && x.name.includes(args[1])));
            if (!command) return message.channel.send('i couldn\'t find such a command');
            return message.channel.send({embed: {
                color: 'RANDOM',
                title: command.name[0],
                description: command.description,
                fields: [
                    { name: 'aliases', value: aliases(command) },
                    { name: 'usage', value: command.usage ? command.usage : `${prefix}${command.name[0]}`}
                ],
                footer: global.footer
            }});
        }
        let embed = {
            color: 'RANDOM',
            title: 'help page',
            description: 'here are all the available commands',
            fields: [],
            footer: global.footer
        }
        bot.commands.each(command => embed.fields.push({
            name: typeof command.name == 'string' ? command.name : `${prefix}${command.name}`, 
            value: command.description
        }));
        return message.channel.send({embed});
    }
}
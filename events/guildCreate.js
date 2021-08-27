const { writeFileSync } = require('fs');
const servers = require('../db/servers.json');

module.exports = {
    name: 'guildCreate',
    execute(bot, guild) {
        servers[guild.id] = {
            prefix: '.',
            deleted: [],
            edited: []
        };
        return writeFileSync('./servers.json', JSON.stringify(servers, null, 2));
    }
}
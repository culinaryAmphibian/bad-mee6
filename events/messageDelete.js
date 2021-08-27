const { writeFileSync } = require('fs');
const servers = require('../db/servers.json');

module.exports = {
    name: 'messageDelete',
    execute(bot, message) {
        let {deleted: cache} = servers[message.guild.id];
        if (cache.length == 10) cache.pop();
        cache.unshift(message);
        return writeFileSync('./db/servers.json', JSON.stringify(servers, null, 2));
    }
}
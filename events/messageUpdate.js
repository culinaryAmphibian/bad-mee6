const { writeFileSync } = require('fs');
const servers = require('../db/servers.json');

module.exports = {
    name: 'messageUpdate',
    execute(bot, oldMessage, newMessage) {
        let {edited: cache} = servers[newMessage.guild.id];
        if (cache.length == 10) cache.pop();
        cache.unshift({old: oldMessage, new: newMessage});
        return writeFileSync('./db/servers.json', JSON.stringify(servers, null, 2));
    }
}
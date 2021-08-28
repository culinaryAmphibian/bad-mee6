const { writeFileSync } = require('fs');
const servers = require('../db/servers.json');
const { ownerId } = require('../secret.json');

module.exports = {
    name: 'setPrefix', description: 'allows admins to change my prefix in this server', usage: '<new prefix>setPrefix',
    execute(message) {
        if (!message.member.hasPermission('ADMINISTRATOR') && message.author.id != ownerId) return message.channel.send('you need to have admin perms to change the prefix');
        if (message.content == 'setPrefix') return message.channel.send('please specify a prefix');
        let newPrefix = message.content.match(/^(.)setPrefix$/);
        servers[message.guild.id].prefix = newPrefix[1];
        writeFileSync('./db/servers.json', JSON.stringify(servers, null, 2));
        return message.channel.send(`success! my prefix in this server has been changed to \`${newPrefix[1]}\``);
    }
}
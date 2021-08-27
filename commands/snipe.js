// const dateFormat = require('dateformat');
const servers = require('../db/servers.json');
const when = require('../util/when');

module.exports = {
    name: ['snipe'], description: 'retreives deleted messages', usage: '[pref]snipe ?<index>',
    execute(message, args) {
        let { deleted: cache } = servers[message.guild.id];
        if (!cache[0]) return message.channel.send('no deleted messages have been recorded as of yet');
        let idx;
        isNaN(args[1]) ? idx = parseInt(args[1]) + 1 : idx = 0;
        let deletedMsg = cache[idx];
        let embed = {
            color: 'RANDOM',
            title: `deleted message ${deletedMsg.id}`,
            description: `sent by ${deletedMsg.author} in ${deletedMsg.channel}`,
            fields: [
                {
                    name: 'content',
                    value: deletedMsg.content
                },
                {
                    name: 'when?',
                    // \n(${dateFormat(deletedMsg.createdTimestamp, 'dddd, mmmm dS, yyyy, h:MM:ss TT', true)})
                    value: `deleted ${when(new Date().getTime() - deletedMsg.createdTimestamp)} ago`
                }
            ],
            footer: global.footer
        }
        if (deletedMsg.attachments) embed.fields.push({name: 'attachments', value: deletedMsg.attachments.size});
        if (deletedMsg.reactions) {
            let reactionStr = [];
            deletedMsg.reactions.cache.each(reaction => {
                let users = [];
                reaction.users.cache.each(user => users.push(user));
                reactionStr.push(`${reaction.emoji}(${reaction.count}): ${users.join(', ')}`);
            })
            embed.fields.push({name: 'reactions', value: reactionStr.join(', ')});
        }
        // stickers?
        if (!deletedMsg.attachments) return message.channel.send({embed});
        let attachmentArr = [];
        deletedMsg.attachments.each(x => attachmentArr.push(x.url));
        return message.channel.send({embed, files: attachmentArr});
    }
}
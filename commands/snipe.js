// const dateFormat = require('dateformat');
const servers = require('../db/servers.json');
const when = require('../util/when');

module.exports = {
    name: ['snipe'], description: 'retreives deleted messages', usage: '[pref]snipe ?<index>',
    execute(message, args) {
        let { deleted: cache } = servers[message.guild.id];
        if (!cache[0]) return message.channel.send('no deleted messages have been recorded as of yet');
        let idx;
        if (!args[1] || isNaN(args[1])) idx = 0;
        else idx = Math.abs(parseInt(args[1])) + 1;
        let deletedMsg = cache[idx];
        if (!cache[idx]) return message.channel.send('there is no deleted message in that slot');
        let embed = {
            color: 'RANDOM',
            title: `deleted message ${deletedMsg.id}`,
            description: `sent by <@${deletedMsg.authorID || deletedMsg.author.id}> in <#${deletedMsg.channelID || deletedMsg.channel.id}>`,
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
        if (deletedMsg.attachments[0]) embed.fields.push({name: 'attachments', value: deletedMsg.attachments.length});
        if (deletedMsg.reactions?.cache?.size > 0) {
            let reactionStr = [];
            deletedMsg.reactions.cache.each(reaction => {
                let users = [];
                reaction.users.cache.each(user => users.push(user));
                reactionStr.push(`${reaction.emoji}(${reaction.count}): ${users.join(', ')}`);
            })
            embed.fields.push({name: 'reactions', value: reactionStr.join(', ')});
        }
        // stickers?
        if (!deletedMsg.attachments[0]) return message.channel.send({embed});
        let attachmentArr = [];
        deletedMsg.attachments.forEach(x => attachmentArr.push(x.url));
        return message.channel.send({embed, files: attachmentArr});
    }
}
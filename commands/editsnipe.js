module.exports = {
    name: ['editsnipe', 'esnipe'],
    execute(message, args) {
        let { edited: cache } = servers[message.guild.id];
        if (!cache[0]) return message.channel.send('no edited messages have been recorded as of yet');
        let idx;
        if (!args[1] || isNaN(args[1])) idx = 0;
        else idx = Math.abs(parseInt(args[1])) + 1;
        if (!cache[idx]) return message.channel.send('there is no edited message in that slot');
        let {old, new: newMsg} = cache[idx];
        let embed = {
            color: 'RANDOM',
            title: `edited message ${old.id}`,
            url: newMsg.url,
            description: `sent by <@${newMsg.authorID || newMsg.author.id}> in <#${newMsg.channelID || newMsg.channel.id}>`,
            fields: [
                {
                    name: 'content',
                    value: old.content
                },
                {
                    name: 'when?',
                    // \n(${dateFormat(deletedMsg.createdTimestamp, 'dddd, mmmm dS, yyyy, h:MM:ss TT', true)})
                    value: `edited ${when(new Date().getTime() - newMsg.editedTimestamp)} ago`
                }
            ],
            footer: global.footer
        }
        if (old.attachments) embed.fields.push({name: 'attachments', value: old.attachments.length});
        // stickers?
        if (!old.attachments) return message.channel.send({embed});
        let attachmentArr = [];
        old.attachments.forEach(x => attachmentArr.push(x.url));
        return message.channel.send({embed, files: attachmentArr});
    }
}
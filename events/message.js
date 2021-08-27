const servers = require('../db/servers.json');

module.exports = {
    name: 'message',
    async execute(bot, message) {
        if (!message.guild) return;
        const {author, guild, content} = message;
        if (author.bot) {
            if (!guild.me.hasPermission('MANAGE_MESSAGES')) return;
            if (author.id != '159985870458322944') return;
            if (!content.test(/^GG <!?@\d{17,19}>, you just advanced to level \d+!$/)) return;
            return message.delete();
        }
        let prefix = servers[guild.id].prefix;
        global.footer = { text: author.username, icon_url: author.displayAvatarURL({dynamic: true}) };
        if (content.endsWith('setPrefix')) return bot.commands.get('setPrefix').execute(message);
        if (!content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).split(' ');
        const command = bot.commands.find(x => x.name.includes(args[0].toLowerCase()) && typeof x.name == 'object');
        if (!command) return;
        return command.execute(message, args, bot);
    }
}
module.exports = {
    name: ['play'], description: 'plays audio in a voice channel',
    async execute(message, args, bot) {
        let vc = message.member.voice?.channel;
        if (!vc) return message.channel.send('you must be in a voice channel to use this command.');
        if (!vc.joinable) return message.channel.send('i can\'t join that channel.');
        if (!vc.speakable) return message.channel.send('i won\'t be able to stream audio in this voice channel.');
    }
}
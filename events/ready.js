module.exports = {
    type: 'ready',
    once: true,
    async callback() {
        console.log(`Connected as ${client.user.tag}`);

        await client.guilds.fetch(config.guildID);
    }
}
module.exports = {
    type: 'ready',
    once: true,
    callback() {
        console.log(`Connected as ${client.user.tag}`);
    }
}
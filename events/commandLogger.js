module.exports = {
    type: 'ready',
    once: true,
    callback() {
        client.commands.forEach(command => {
            client.interactionClient.createCommand(command, config.guildID)
                .then(() => console.log(`Logged ${command.name} command !`))
                .catch((error) => console.error(`${command.name} command failed to login : ${error}`));
        });
    }
}
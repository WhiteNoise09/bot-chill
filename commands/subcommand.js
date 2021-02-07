module.exports = {
    name: 'sup',
    description: 'normal command',
    options: [
        {
            name: "sub",
            description: "subcommand of supcommand",
            type: "sub_command",
            options: [
                {
                    name: 'hey',
                    description: 'hey ...',
                    type: 'integer'
                }
            ]
        }
    ],
    execute(interaction) {
        interaction.reply('Pong !');
    }
}
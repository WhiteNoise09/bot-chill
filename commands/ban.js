module.exports = {
    name: 'ban',
    description: 'banni la personne désignée',
    options: [
        {
            name: 'target',
            description: 'la personne que vous voulez bannir',
            type: 'user'
        },
        {
            name: 'reason',
            description: 'la raison du bannissement',
            type: 'string'
        }
    ],
    execute(interaction) {
        console.log(interaction.options);
        const target = interaction.options.target;
        const reason = interaction.options.reason;

        interaction.reply(embed`${interaction.options.target} a été banni(e) pour la raison suivante : \n> ${interaction.options.reason}`);
    }
}
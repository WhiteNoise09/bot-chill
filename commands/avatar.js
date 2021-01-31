module.exports = {
    name: 'avatar',
    description: 'affiche votre avatar, ou celui de la personne choisie',
    options: [
        {
            name: 'target',
            description: 'la personne dont vous souhaitez voir l\'avatar',
            type: 'user'
        }
    ],
    execute(interaction) {
        console.log(interaction);
        const target = ('target' in interaction.options) ? interaction.options.target.user : interaction.member.user;

        console.log(interaction.options);

        interaction.reply(this.getEmbed(target));
    },
    getEmbed(target, size = 1024) {
        return new MessageEmbed()
            .setColor(config.embedColor)
            .setImage(target.displayAvatarURL({size: size}))
            .setDescription(`Avatar de ${target} \n cliquez [ici](${target.displayAvatarURL({size: size})}) pour le voir en grand !`);
    }
}
module.exports = {
    name: 'start',
    description: 'démarre une partie de lg',
    async execute(interaction) {
        await interaction.acknowledge();
        let timer = 10;
        const buildEmbed = () => embed`Une partie de lg va commencer dans ${timer} secondes, cliquez sur la réaction pour vous inscrire !`;

        interaction.channel.send(buildEmbed()).then(msg => {
            msg.react('✅');
            const intervalID = { value: 0 };
            intervalID.value = setInterval(() => {
                timer--;
                if(timer < 0) return clearInterval(intervalID.value);
                msg.edit(buildEmbed());
            }, 1000);
        });
    }
}
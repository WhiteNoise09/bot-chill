module.exports = {
    name: 'homeworks',
    description: 'donne la liste des devoirs à venir, ou du jour à venir',
    options: [
        {
            name: 'daily',
            description: 'voir les devoir du prochain jour',
            type: 'boolean'
        }
    ],
    async execute(interaction) {
        if(interaction.options.daily) interaction.reply(await this.getDayEmbed());
        else interaction.reply(await this.getEmbed());
    },
    async getEmbed() {
        const embed = new MessageEmbed()
            .setColor(config.embedColor)
            .setAuthor('Devoirs à venir :', config.ed_logo);
        
        const homeworks = await ed_client.getHomeworks();

        for(const key in homeworks) {
            const dayHomeworks = homeworks[key];
            const date = new Date(key);

            embed.addField(date.toLocaleDateString('fr-FR'), dayHomeworks.map(hw => `- ${hw.matiere.toLowerCase()}`).join('\n'));
        }

        return embed;
    },
    async getDayEmbed() {
        const embed = new MessageEmbed()
            .setColor(config.embedColor)
            .setAuthor('Devoirs du jour à venir :', config.ed_logo);
        
        const homeworksList = await ed_client.getHomeworks();
        const date = new Date(Object.keys(homeworksList)[0]);

        const homeworks = await ed_client.getHomeworksForDay(date);

        for(const key in homeworks.matieres) {
            const homework = homeworks.matieres[key];

            embed.addField(homework.matiere, homework.aFaire.contenu);
        }

        return embed;
    }
}
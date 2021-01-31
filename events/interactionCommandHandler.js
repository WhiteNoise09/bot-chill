module.exports = {
    type: 'interactionCreate',
    async callback(interaction) {
        const command = client.commands.get(interaction.commandName);

        await parseOptions(interaction, command);

        try{
            command.execute(interaction);
        } catch(e) {
            console.error(e);
        }
    }
}

async function parseOptions(interaction, command) {
    const newOptions = { };

    for(let i = 0 ; i < interaction.options?.length ; i++) {
        const option = interaction.options[i];
        const optionType = command.options.find(o => o.name === option.name).type.toUpperCase();

        switch(optionType) {
            case 'USER':
                option.value = await interaction.guild.members.fetch(option.value);
                break;
            case 'CHANNEL':
                option.value = await client.channels.fetch(option.value);
                break;
            case 'ROLE':
                option.value = await interaction.guild.roles.fetch(option.value);
                break;
        }

        newOptions[option.name] = option.value;
    }

    interaction.options = newOptions;
}
module.exports = {
    type: 'interactionCreate',
    async callback(interaction) {
        let command = client.commands.get(interaction.commandName);

        if(command.isNamespace) {
            const op = interaction.options[0];
            command = client.commands.find(cmd => cmd.name === interaction.commandName).options.find(sbcmd => sbcmd.name === op.name);
            interaction.options = await parseOptions(interaction, op.options, command);
        }
        else interaction.options = await parseOptions(interaction, interaction.options, command);

        try{
            command.execute(interaction);
        } catch(e) {
            console.error(e);
        }
    }
}

async function parseOptions(interaction, options, command) {
    const newOptions = { };

    for(let i = 0 ; i < options?.length ; i++) {
        const option = options[i];
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

    return newOptions;
}
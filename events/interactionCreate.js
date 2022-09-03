module.exports = {
    name: 'interactionCreate',

    async run(client, interaction) {
        // check whether this interaction is a slash command
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (command) {
                command.run(client, interaction);
            }
        }

        // more listeners can be added here
    },
};

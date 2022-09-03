const { ApplicationCommandOptionType: Type } = require('discord.js');

module.exports = {
    name: 'echo',
    description: 'echoes a message',
    options: [
        {
            name: 'message',
            description: 'message to be echoed',
            type: Type.String,
            required: true,
        },
    ],

    async run(client, interaction) {
        const message = interaction.options.getString('message');
        interaction.reply({ content: message });
    },
};

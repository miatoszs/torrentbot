// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { exec } = require('child_process');

// function askPython(question, callback) {
//     exec(`python answer.py "${question}"`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`exec error: ${error}`);
//             callback(error, null);
//             return;
//         }
//         callback(null, stdout);
//     });
// }

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('ask')
//         .setDescription('Ask the AI a question.')
//         .addStringOption(option => 
//             option.setName('question')
//                   .setDescription('Your question for the AI.')
//                   .setRequired(true)),
    
//     async execute(interaction) {
//         const question = interaction.options.getString('question');
        
//         // Immediately acknowledge the interaction
//         await interaction.deferReply();
        
//         askPython(question, async (err, answer) => {
//             if (err) {
//                 await interaction.editReply({ content: 'There was an error processing your question.' });
//                 return;
//             }
//             await interaction.editReply(answer.trim());
//         });
//     }
// };



const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask the AI a question.'),

    async execute(interaction) {
        const sent = await interaction.reply({ content: 'We are working on this command', fetchReply: true });
        
    }
};

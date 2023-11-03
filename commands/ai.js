const { SlashCommandBuilder, MessageEmbed } = require('discord.js'); 
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chatgpt")
        .setDescription("Generate a chat with GPT-3")
        .addStringOption(option => 
            option.setName('prompt') 
            .setDescription('The prompt for ai')
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({ content: `Loading your response.... this could take some time`, ephemeral: false });

        // Correct way to get the 'prompt' string option from the interaction
        const prompt = interaction.options.getString('prompt'); 

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://chat-app-f2d296.zapier.app/');
        const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]'; 
        await page.waitForSelector(textBoxSelector);
        await page.type(textBoxSelector, prompt);
        
        await page.keyboard.press('Enter');

        await page.waitForSelector('[data-testid="final-bot-response"] p'); 
        var value = await page.$$eval('[data-testid="final-bot-response"]', async (elements) => {
            return elements.map((element) => element.textContent);
        
        });
        setTimeout(async () => {
            if (value.length ==0) return await interaction.editReply({ content: `There was an error getting the response, try again later!`});
        },30000);
        await browser.close();




        value.shift();
        const Embed = {
            color: 0x0000FF,
            description: `\`\`\`${value.join(`\n\n\n\n`)}\`\`\``,
            timestamp: new Date(),
        };
            

        await interaction.editReply({ embeds: [Embed] });

        await browser.close();
    } 
}

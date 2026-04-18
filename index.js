const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

const server = restify.createServer();
server.listen(process.env.PORT || 3978, () => {
    console.log('Bot is running on port ' + (process.env.PORT || 3978));
});

const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId || '',
    appPassword: process.env.MicrosoftAppPassword || ''
});

// IMPORTANT FIX: correct handler signature
server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {
            await context.sendActivity('You said: ' + context.activity.text);
        }
    });
});
const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Create server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log("Bot is running on port 3978");
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {
            await context.sendActivity(`You said: ${context.activity.text}`);
        }
    });
});
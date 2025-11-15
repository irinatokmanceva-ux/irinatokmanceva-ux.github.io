const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    console.log('Token exists:', !!token);
    console.log('Chat ID exists:', !!chatId);
    
    if (!token || !chatId) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Missing environment variables' })
        };
    }
    
    try {
        console.log('Sending notification to Telegram...');
        
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: 'Тук-Тук!'
            })
        });
        
        const data = await response.json();
        console.log('Telegram response:', data);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true,
                message: 'Notification sent successfully'
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to send notification',
                details: error.message 
            })
        };
    }
};

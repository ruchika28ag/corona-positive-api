require('dotenv').config();

module.exports = {
    snooConfig: {
        userAgent: 'covid positive web service v1.0',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD,
    }
}
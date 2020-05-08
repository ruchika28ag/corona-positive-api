const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const snoowrap = require('snoowrap');
const config = require('./config');

const news = require('./controllers/news');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const r = new snoowrap(config.snooConfig)

app.get('/api', (req, res) => {
    res.json({message: 'It is working!'});
})

app.post('/api/news', news.handleNews)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}.`);
})
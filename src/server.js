const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const snoowrap = require('snoowrap');
const config = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const r = new snoowrap(config.snooConfig)

app.get('/api', (req, res) => {
    res.json({message: 'It is working!'});
})

app.get('/api/news', async (req, res) => {
    const data = await r.getSubreddit('coronavirus').search({
        query: 'flair:"good news"',
        sort: "new",
        time: "all",
    });
    const good = data.map(post => {
        return {
            title: post.title,
            thumbnail: post.thumbnail,
            url: post.url,
            subreddit: post.subreddit.display_name,
            flair: post.link_flair_text,
        }
    })
    res.json(good);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}.`);
})
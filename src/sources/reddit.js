const snoowrap = require('snoowrap');
const config = require('../config');

const fetchReddit = async (subreddit, filter, after) => {
    const r = new snoowrap(config.snooConfig)

    if (after && after[subreddit]) filter.after = 't3_' + after[subreddit];

    const data = await r.getSubreddit(subreddit).search(filter);
    
    const good = data.map(post => {
        return {
            id: post.id,
            title: post.title,
            thumbnail: post.thumbnail,
            url: post.url,
            subreddit: post.subreddit.display_name,
            flair: post.link_flair_text,
        }
    })

    return {
      data: good,
      after: [subreddit, good[good.length - 1].id]
    };
}

module.exports = fetchReddit;
const fetchReddit = require('../sources/reddit');

const handleNews = async (req, res) => {
    const sources = [
        {
            name: "coronavirus",
            filter: {
                query: 'flair:"good news"',
                sort: "new",
                time: "all",
                limit: 5,
            }
        },
        {
            name: "upliftingnews",
            filter: {
                query: 'corona',
                sort: "new",
                time: "all",
                limit: 5,
            }
        }
    ]

    const promis = sources.map((so)=>{
        return fetchReddit(so.name, so.filter, req.body.after);
    })

    const resp = await Promise.all(promis);

    const data = [];
    const after = {};
    resp.forEach((r)=>{
        data.push(...r.data);
        after[r.after[0]]= r.after[1];
    })

    res.json(
        {
            data,
            after,
        }
    )
}

module.exports = {
  handleNews: handleNews,
};
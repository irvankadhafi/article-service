const Article = require('./article.model');

module.exports = {
  index: async (req, res) => {
    const { query, author } = req.query;
    try {
      if (query && author) {
        const body = {
          size: 100,
          from: 0,
          sort: {
            created: { order: 'desc' },
          },
          query: {
            bool: {
              should: [
                {
                  bool: {
                    should: [
                      {
                        match: {
                          title: query,
                        },
                      },
                      {
                        match: {
                          body: query,
                        },
                      },
                    ],
                    must: [
                      {
                        match_phrase: {
                          author,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        };
        const results = await Article.search(body).then((item) => item.body);
        res.json({
          took: results.took,
          hitsTotal: results.hits.total,
          data: (results.hits.hits).map((item) => item._source),
        }).status(200);
      }

      const body = {
        size: 100,
        from: 0,
        sort: {
          created: { order: 'desc' },
        },
      };
      const results = await Article.search(body).then((item) => item.body);
      res.json({
        took: results.took,
        hitsTotal: results.hits.total,
        data: (results.hits.hits).map((item) => item._source),
      }).status(200);
    } catch (err) {
      res.json(err).status(422);
    }
  },
};

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
              must: [
                {
                  multi_match: {
                    query: req.query.query,
                    fields: ['title', 'body'],
                  },
                },
                {
                  match_phrase: {
                    author,
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
      } else if (query) {
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
            },
          },
        };
        const results = await Article.search(body).then((item) => item.body);
        res.json({
          took: results.took,
          hitsTotal: results.hits.total,
          data: (results.hits.hits).map((item) => item._source),
        }).status(200);
      } else if (author) {
        const body = {
          size: 100,
          from: 0,
          sort: {
            created: { order: 'desc' },
          },
          query: {
            match_phrase: {
              author,
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
  show: async (req, res) => {
    const { idArtikel } = req.params;
    try {
      const cache = await Article.getCache(idArtikel);
      console.log(JSON.parse(cache));
      if (!cache) {
        const body = {
          query: {
            match: { id: Number(idArtikel) },
          },
        };
        const results = await Article.search(body).then((item) => item.body);
        const data = {
          took: results.took,
          hitsTotal: results.hits.total,
          data: (results.hits.hits).map((item) => item._source),
        };
        await Article.setCache(idArtikel, JSON.stringify(data));
        res.json(data).status(200);
      } else {
        res.json(JSON.parse(cache)).status(200);
      }
    } catch (err) {
      res.json(err).status(422);
    }
  },
};

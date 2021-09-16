const { validationResult } = require('express-validator');
const Article = require('./article.model');

module.exports = {
  index: async (req, res) => {
    try {
      const body = {
        sort: {
          created: { order: 'desc' },
        },
      };
      const results = await Article.search(body).then((item) => item.body.hits.hits);
      const newData = results.map((item) => ({
        id: item._source.id,
        author: item._source.author,
        title: item._source.title,
        body: item._source.body,
        created: item._source.created,
      }));
      res.json(newData).status(200);
    } catch (err) {
      res.json(err).status(422);
    }
  },
  store: async (req, res) => {
    const { author, title, body } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      const data = { author, title, body };
      return await Article.add(data).then((result) => {
        res
          .json({
            message: 'saved',
            data: result,
          })
          .status(200);
      });
    } catch (err) {
      res
        .json({
          message: 'Error saving record',
          error: err,
        })
        .status(500);
    }
  },
};

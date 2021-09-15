const Article = require('./article.model');

module.exports = {
  index: async (req, res) => {
    try {
      const result = await Article.find();
      res.json(result).status(200);
    } catch (err) {
      res.json(err).status(422);
    }
  },
  store: async (req, res) => {
    try {
      const { author, title, body } = req.body;
      const article = await Article.add({ author, title, body });
      res.json(article).status(200);
    } catch (err) {
      res.json(err).status(422);
    }
  },
};

const { validationResult } = require('express-validator');
const Article = require('./article.model');

module.exports = {
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

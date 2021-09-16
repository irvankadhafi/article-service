const express = require('express');
const article = require('./article.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'Hello World! My name Irvan Kadhafi',
    message: 'This is Article Search Service',
    endpoint: '[GET] /articles => to get all article',
    requestParam: '{query(body, title) or author}',
  });
});
router.use('/articles', article);

module.exports = router;

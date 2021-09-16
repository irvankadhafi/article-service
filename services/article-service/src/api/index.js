const express = require('express');
const article = require('./article.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'Hello World! My name Irvan Kadhafi',
    message: 'This is Article Service',
    endpoint: '[POST] /articles => to post a new article',
    requestBody: '{author, title, body}',
  });
});
router.use('/articles', article);

module.exports = router;

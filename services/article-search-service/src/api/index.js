const express = require('express');
const article = require('./article.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'Hello World! My name Irvan Kadhafi',
    message: 'This is Article Search Service',
    endpoint: '[GET] /article => to get all article',
    requestParam: '{query(body, title), author}',
  });
});
router.use('/article', article);

module.exports = router;

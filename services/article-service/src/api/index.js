const express = require('express');
const article = require('./article.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: 'Hello World! My name Irvan Kadhafi',
    message: 'This is Article Service',
  });
});
router.use('/article', article);

module.exports = router;

const express = require('express');
const ArticleController = require('./article.controller');

const router = express.Router();

// Get All Article
router.get('/', ArticleController.index);
router.post('/', ArticleController.store);
module.exports = router;

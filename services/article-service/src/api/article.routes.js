const express = require('express');
const ArticleController = require('./article.controller');
const { articleValidationRules } = require('./article.validator');

const router = express.Router();

// Get All Article
router.get('/', ArticleController.index);

// Add a new article
router.post('/', articleValidationRules(), ArticleController.store);
module.exports = router;

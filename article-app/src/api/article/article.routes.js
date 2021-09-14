import express from 'express';
import ArticleController from './article.controller';

const router = express.Router();

// Get All Article
router.get('/', ArticleController.index);
router.post('/', ArticleController.store);

export default router;

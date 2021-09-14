import express from 'express';
import article from './article/article.routes';

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    name: 'Hello World! My name Irvan Kadhafi',
    message: 'Kumparan - Backend Technical Assessment',
  });
});
router.use('/article', article);

export default router;

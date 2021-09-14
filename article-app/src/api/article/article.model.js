import db from '../../db';

// Fetch all articles
const modelName = 'articles';
export default {
  find: () => db(modelName),
  add: (article) => db(modelName).insert(article, 'title'),
};

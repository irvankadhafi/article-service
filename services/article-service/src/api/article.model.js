const db = require('../db');
// Fetch all articles
const modelName = 'articles';
module.exports = {
  find: () => db(modelName).orderBy('created', 'desc'),
  add: (article) => db(modelName).insert(article, 'title'),
};

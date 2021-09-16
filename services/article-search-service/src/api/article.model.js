const { elastic } = require('../config');

// Fetch all articles
const modelName = 'articles';
module.exports = {
  search: (body) => elastic.search({ index: modelName, body }),
};

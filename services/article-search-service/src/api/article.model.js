const { elastic, redis } = require('../config');

// Fetch all articles
const modelName = 'articles';
module.exports = {
  search: (body) => elastic.search({ index: modelName, body }),
  getCache: async (id) => await redis.get(`${modelName}-${id}`),
  setCache: async (id, value) => await redis.set(`${modelName}-${id}`, value),
};

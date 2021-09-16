const Article = require('../../src/api/article.model');
const berita = require('./berita.json');

exports.seed = async (knex) => {
  const data = [];
  const article = knex('articles');
  return article.del()
    .then(async () => {
      berita.forEach((item) => {
        data.push({
          id: item.id,
          author: item.author,
          title: item.title,
          body: item.content,
          created: item.date,
        });
      });
      await Article.bulkSync(data);
      await article.insert(data);
    });
};

const faker = require('faker');

exports.seed = async (knex) => {
  const data = [];
  const article = knex('articles');
  return article.del()
    .then(async () => {
      for (let i = 0; i < 100; i++) {
        data.push({
          author: faker.name.findName(),
          title: faker.random.words(),
          body: faker.lorem.paragraphs(),
        });
      }
      await article.insert(data);
    });
};

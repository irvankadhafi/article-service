const { db, elastic } = require('../config');

// Fetch all articles
const modelName = 'articles';
module.exports = {
  add: (article) => db(modelName).insert(article, 'id').then((res) => db(modelName).where('id', res).first()),
  bulkSync: async (result) => {
    try {
      await elastic.indices.create({
        index: 'articles',
        body: {
          mappings: {
            properties: {
              id: { type: 'integer' },
              author: { type: 'text' },
              title: { type: 'text' },
              body: { type: 'text' },
              created: { type: 'date' },
            },
          },
        },
      }, { ignore: [400] });
      const body = result.flatMap((doc) => {
        const newData = {
          ...doc,
          created: new Date(doc.created).toISOString(),
        };
        return [
          {
            index: {
              _index: 'articles',
              _id: doc.id,
            },
          },
          newData,
        ];
      });

      const { body: bulkResponse } = await elastic.bulk({ refresh: true, body });

      if (bulkResponse.errors) {
        const erroredDocuments = [];
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
          const operation = Object.keys(action)[0];
          if (action[operation].error) {
            erroredDocuments.push({
              // If the status is 429 it means that you can retry the document,
              // otherwise it's very likely a mapping error, and you should
              // fix the document before to try it again.
              status: action[operation].status,
              error: action[operation].error,
              operation: body[i * 2],
              document: body[i * 2 + 1],
            });
          }
        });
        console.log(erroredDocuments);
      }

      const { body: count } = await elastic.count({ index: 'articles' });
      console.log(count);
    } catch (err) {
      console.log({
        message: 'Error saving record',
        error: err,
      });
    }
  },
};

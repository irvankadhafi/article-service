const { Client } = require('@elastic/elasticsearch');

require('dotenv').config();

const elasticUrl = 'http://0.0.0.0:9200';
const esclient = new Client({ node: elasticUrl });
const index = 'articles';

async function run() {
  await esclient.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.',
    },
  });
}
run().catch(console.log);

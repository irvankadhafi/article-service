import knex from 'knex';
import knexConfig from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);
module.exports = connection;

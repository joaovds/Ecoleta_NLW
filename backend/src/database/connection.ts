import knex from 'knex';

const configuration = require('../../knexfile.ts');

const connection = knex(configuration.development);

export default connection;

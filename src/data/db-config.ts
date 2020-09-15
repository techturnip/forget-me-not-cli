import knex from 'knex'
const config = require('../../knexfile.ts')

export default knex(config.development)

// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/fmn-dev.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/data/migrations',
    },
    seeds: {
      directory: './src/data/seeds',
    },
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/fmn-prod.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/data/migrations',
    },
  },

}

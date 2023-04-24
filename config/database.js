const path = require('path');

const {
  DB_USER = '',
  DB_PASSWORD = '',
  DB_NAME = '',
  DB_HOST = '127.0.0.1',
  DB_PORT = '5432'
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres'
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_tests`,
    host: DB_HOST,
    port: DB_PORT,
    storage: path.join(__dirname, '../node_modules/test.sqlite'),
    dialect: 'sqlite',
    logging: false
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    dialect: 'postgres'
  }
};

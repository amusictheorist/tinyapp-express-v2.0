const { Pool } = require('pg');
require('dotenv').config();

const dbName = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME;

const dbParams = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: dbName,
  port: process.env.DB_PORT
};

const db = new Pool(dbParams);

// Test the connection
db.connect()
  .then(() => console.log(`Connected to ${dbName} successfully!`))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

module.exports = db;

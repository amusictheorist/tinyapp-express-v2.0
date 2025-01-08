-- To create test db tables run NODE_ENV=test psql -U YOUR_DB_USER -d TEST_DB_NAME -f db/schema/schema.sql

DROP TABLE IF EXISTS urls;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
  );

  CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    shortURL VARCHAR(255) UNIQUE NOT NULL,
    longURL TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );
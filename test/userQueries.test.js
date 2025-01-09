process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const { db, connectToTestDatabase } = require('../db/testConnection');
const userQueries = require('../db/queries/user_queries');


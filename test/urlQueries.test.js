process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const { db, connectToTestDatabase } = require('../db/testConnection');
const urlQueries = require('../db/queries/url_queries');

describe('URL queries', () => {
  it('should return an array of URLS with owner email', async () => {
    const result = await urlQueries.getAllUrls();

    expect(result).to.be.an('array');
  });

  it('should throw an error for invalid queries', async () => {
    try {
      await db.query('SELECT * FROM fake_table');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.include('relation "fake_table" does not exist');
    }
  });
});
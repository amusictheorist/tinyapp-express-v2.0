process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const { db } = require('../db/testConnection');
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

  it('should return URLs by specific user', async () => {
    const result = await urlQueries.getUrlsByUser(1);

    expect(result).to.be.an('array').that.is.not.empty;
    expect(result[0].user_id).to.equal(1);
    expect(result[0].shorturl).to.equal('b2xVn2');
    expect(result[0].longurl).to.equal('http://www.lighthouselabs.ca');
  });
  
  it('should return a specific url', async () => {
    const result = await urlQueries.getSpecificUrl('b2xVn2', 1);
    
    expect(result).to.be.an('object');
    expect(result.user_id).to.equal(1);
    expect(result.shorturl).to.equal('b2xVn2');
    expect(result.longurl).to.equal('http://www.lighthouselabs.ca');
  });

  it('should return a specific long URL', async () => {
    const result = await urlQueries.getUrlByShortUrl('9sm5xK');
    
    expect(result).to.be.an('object');
    expect(result).to.not.be.null;
    expect(result.longurl).to.have.length.above(0);
    expect(result.longurl).to.equal('http://www.google.com');
  });

  it('should return null for a non-existent short URL', async () => {
    const emptyResult = await urlQueries.getUrlByShortUrl('nonexistentShortURL');

    expect(emptyResult).to.be.null;
  });

  it('should create a new short URL', async () => {
    const result = await urlQueries.createUrl('shorturl', 'longurl', 1);

    expect(result).to.not.be.null;
    expect(result).to.not.be.undefined;
    expect(result).to.be.a('string');
    expect(result).to.equal('shorturl');
  });

  it('should delete a specific URL', async () => {
    const result = await urlQueries.deleteUrl('shorturl', 7);

    expect(result.rowCount).to.equal(1);

    const checkResult = await urlQueries.getUrlByShortUrl('shorturl');

    expect(checkResult).to.be.null;
  });
});
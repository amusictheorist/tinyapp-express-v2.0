process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const { db, connectToTestDatabase } = require('../db/testConnection');
const userQueries = require('../db/queries/user_queries');

describe('User Queries', () => {
  it('should fetch a user by their ID', async () => {

    const result = await userQueries.getUserById(1);

    expect(result).to.not.be.null;
    expect(result).to.be.an('object');
    expect(result.id).to.equal(1);
    expect(result.email).to.equal('a@a.com');
    expect(result.password).to.equal('asdf');
  });

  it('should retrun null if user ID does not exist', async () =>{

    const result = await userQueries.getUserById(100);

    expect(result).to.be.null;
  });

  it('should fetch a user by their email', async () => {

    const result = await userQueries.getUserByEmail('b@b.com');

    expect(result).to.not.be.null;
    expect(result).to.be.an('object');
    expect(result.id).to.equal(2);
    expect(result.email).to.equal('b@b.com');
    expect(result.password).to.equal('qwer');
  });

  it('should return null if user email does not exist', async () => {

    const result = await userQueries.getUserByEmail('');

    expect(result).to.be.null;
  });

  it('should create and insert user into database', async () => {

    const result = userQueries.createUser('z@z.com', 'asdf');
    // Need to finish these assertions, returning undefined for some reason
    expect(result.email).to.equal('z@z.com');

    // Deleting newly created user to avoid future test failures
    const purgeResult = await db.query('DELETE FROM users WHERE email = $1', [result.email]).then(data => {return data.rows});
  });
});
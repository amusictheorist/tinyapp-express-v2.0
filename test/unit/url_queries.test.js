const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../db/connection');
const urlQueries = require('../../db/queries/url_queries');

const mockUsers = {
  rows: [
    { id: 1, email: 'a@a.com', password: 'asdf' },
    { id: 2, email: 'b@b.com', password: 'qwer' },
    { id: 3, email: 'c@c.com', password: 'zxcv' },
    { id: 4, email: 'd@d.com', password: '1234' },
    { id: 5, email: 'e@e.com', password: '4567' },
    { id: 6, email: 'f@f.com', password: '7890' }
  ]
};

const mockURLs = {
  rows: [
    { id: 1, shorturl: 'b2xVn2', longurl: 'http://www.lighthouselabs.ca', user_id: 1 },
    { id: 2, shorturl: '9sm5xK', longurl: 'http://www.google.com', user_id: 2 },
    { id: 3, shorturl: 'q2evqwzpg3', longurl: 'http://www.youtube.com', user_id: 3 },
    { id: 4, shorturl: 'au8lus7d05', longurl: 'http://www.wikipedia.com', user_id: 4 },
    { id: 5, shorturl: 'nbmwdt7us2o', longurl: 'http://www.github.com', user_id: 5 },
    { id: 6, shorturl: 'piforyrfd', longurl: 'http://www.outlook.com', user_id: 6 }
  ]
};
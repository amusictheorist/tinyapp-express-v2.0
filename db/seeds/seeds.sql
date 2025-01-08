-- To seed test db run NODE_ENV=test psql -U YOUR_DB_USER -d TEST_DB_NAME -f db/seeds/seeds.sql
INSERT INTO users (email, password) VALUES
('a@a.com', 'asdf'),
('b@b.com', 'qwer'),
('c@c.com', 'zxcv'),
('d@d.com', '1234'),
('e@e.com', '4567'),
('f@f.com', '7890');

INSERT INTO urls (shortURL, longURL, user_id) VALUES
('b2xVn2', 'http://www.lighthouselabs.ca', 1),
('9sm5xK', 'http://www.google.com', 2),
('q2evqwzpg3', 'http://www.youtube.com', 3),
('au8lus7d05', 'http://www.wikipedia.com', 4),
('nbmwdt7us2o', 'http://www.github.com', 5),
('piforyrfd', 'http://www.outlook.com', 6);

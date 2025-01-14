const { db } = process.env.NODE_ENV === 'test' ? require('../testConnection') : require('../connection');

const getAllUrls = () => {
  return db.query(`
    SELECT urls.*, users.email AS owner_email
    FROM urls
    JOIN users ON urls.user_id = users.id
    `).then(data => data.rows);
};

const getUrlsByUser = (userId) => {
  return db.query('SELECT * FROM urls WHERE user_id = $1', [userId])
  .then(data => {
    return data.rows;
  });
};

const getSpecificUrl = (shortURL, userId) => {
  return db.query('SELECT * FROM urls WHERE shorturl = $1 AND user_id = $2', [shortURL, userId])
  .then(data => {
    return data.rows[0];
  });
};

const getUrlByShortUrl = (shortURL) => {
  return db.query('SELECT longurl FROM urls WHERE shorturl = $1', [shortURL])
  .then(data => {
    return data.rows.length > 0 ? data.rows[0] : null;
  });
};

const updateSpecificUrl = (longURL, urlId) => {
  return db.query('UPDATE urls SET longurl = $1 WHERE id = $2', [longURL, urlId]);
};

const deleteUrl = (shortURL) => {
  return db.query('DELETE FROM urls WHERE shorturl = $1', [shortURL]);
};

const createUrl = (shortURL, longURL, userId) => {
  return db.query('INSERT INTO urls (shorturl, longurl, user_id) VALUES ($1, $2, $3) RETURNING shorturl', [shortURL, longURL, userId])
  .then(data => {
    return data.rows[0].shorturl;
  });
};

module.exports = { getAllUrls, getUrlsByUser, getSpecificUrl, getUrlByShortUrl, updateSpecificUrl, deleteUrl, createUrl };
const db = require('./connection');

db.query('SELECT current_database();')
  .then(result => {
    console.log('Connected to database:', result.rows[0].current_database);
    db.end();
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

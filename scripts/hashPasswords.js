// Import dependencies
const db = require('../db/connection');
const bcrypt = require('bcrypt');

// List of users to update with hashed passwords
const users = [
  { id: 1, email: 'a@a.com', password: 'asdf' },
  { id: 2, email: 'b@b.com', password: 'qwer' },
  { id: 3, email: 'c@c.com', password: 'zxcv' }
];

// Function to hash passwords and update them in the database
async function hashPasswords() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
    console.log(`Password for ${user.email} successfully hashed.`);
  }
};

// Run the password hashing process
hashPasswords().catch((error) => console.error('Error hashing passwords: ', error));

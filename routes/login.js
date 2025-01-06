const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { getUserByEmail } = require('../queries/user_queries');

// GET /login
router.get('/', (req, res) => {
  const templateVars = { user: null };
  res.render('login', templateVars);
});

// POST /login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get the user by email
    const user = await getUserByEmail(email);
    console.log('User fetched:', user); // Check the fetched user

    // If user doesn't exist or the password doesn't match
    if (!user) {
      return res.status(403).send('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', passwordMatch); // Check if passwords match

    if (!passwordMatch) {
      return res.status(403).send('Invalid email or password');
    }

    // If credentials are correct, set the session and redirect
    req.session.userId = user.id;
    res.redirect('/urls');
  } catch (error) {
    console.error('Error during login: ', error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

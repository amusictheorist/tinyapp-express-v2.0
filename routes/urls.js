const express = require('express');
const router = express.Router();
const { generateRandomString } = require('../helpers');
const urlQueries = require('../db/queries/url_queries');
const userQueries = require('../db/queries/user_queries');

// Route for home
router.get('/', (req, res) => {
  res.redirect('urls');
});

// GET /urls
router.get('/urls', async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).redirect('/login');
  }

  try {
    const user = userId ? await userQueries.getUserById(userId) : null;
    const urls = await urlQueries.getAllUrls();

    const templateVars = { user, urls };
    res.render('urls_index', templateVars);
  } catch (error) {
    console.error('Error fetching URLs: ', error);
    res.status(500).send('Internal server error');
  }
});

// GET /urls/new
router.get('/urls/new', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).redirect('/login');
  }

  const templateVars = { user: userId };
  res.render('urls_new', templateVars);
});

// GET /urls/:id
router.get('/urls/:id', async (req, res) => {
  const shortURL = req.params.id;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).redirect('/login');
  }

  try {
    const user = await userQueries.getUserById(userId);
    const url = await urlQueries.getSpecificUrl(shortURL, userId);

    if (!url) {
      return res.status(404).send('URL not found');
    }

    const isOwner = url.user_id === userId;

    const templateVars = { user, url, isOwner };
    res.render('urls_show', templateVars);
  } catch (error) {
    console.error('Error fetching URL for edit: ', error);
    res.status(500).send('Internal server error');
  }
});


// POST /urls/:id
router.post('/urls/:id', async (req, res) => {
  const userId = req.session.userId;
  const { longURL } = req.body;
  const urlId = req.params.id;

  if (!userId) {
    return res.status(401).redirect('/login');
  }

  try {
    const url = await urlQueries.getSpecificUrl(urlId, userId);

    if (!url) {
      return res.status(403).send('You are not authorized to edit this URL!');
    }

    await urlQueries.updateSpecificUrl(longURL, urlId);
    res.redirect(`/urls/${urlId}`);
  } catch (error) {
    console.error('Error updating URL: ', error);
    res.status(500).send('Internal server error');
  }
});


// POST /urls/:id/delete
router.post('/urls/:id/delete', async (req, res) => {
  const userId = req.session.userId;
  const shortURL = req.params.id;

  if (!userId) {
    return res.status(401).redirect('/login');
  }

  try {
    const url = await urlQueries.getSpecificUrl(shortURL, userId);

    if (!url) {
      return res.status(403).send('You are not authorized to delete this URL!');
    }

    await urlQueries.deleteUrl(shortURL);

    res.redirect('/urls');
  } catch (error) {
    console.error('Error deleting URL: ', error.message);
    res.status(500).send('Internal server error');
  }
});



// GET /u/:id
router.get('/u/:id', async (req, res) => {
  const shortURL = req.params.id;

  try {
    const url = await urlQueries.getUrlByShortUrl(shortURL);

    if (!url) {
      return res.status(404).send('URL not found');
    }
    res.redirect(url.longurl)
    } catch (error) {
    console.error('Error redirecting to URL: ', error.message, error.stack);
    res.status(500).send('Internal server error')
  }
});

// POST /urls
router.post('/urls', async (req, res) => {
  const userId = req.session.userId;
  const { longURL } = req.body;

  if (!userId) {
    return res.status(401).redirect('/login');
  }

  try {
    const shortURL = generateRandomString();
    await urlQueries.createUrl(shortURL, longURL, userId);
    console.log(`URL created: ${shortURL}`);
    res.redirect(`/urls/${shortURL}`);
  } catch (error) {
    console.error('Error creating URL: ', error);
    res.status(500).send('Internal server error');
  }
});

// POST /logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  })
});

module.exports = router;
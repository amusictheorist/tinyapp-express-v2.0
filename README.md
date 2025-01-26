# Express TinyApp v2.0

**TinyApp** is a full-stack web application built with Node.js and Express that allows users to shorten long URLs, similar to bit.ly. This is version 2 of a previously built app, which can be found here: https://github.com/amusictheorist/tiny-app-v1.0.
  
## New features and enhancements
- **Express Router integration:** routes have been refactored to use Express Router for better modularity and maintainability.
- **Database integration:** replaced hardcoded mock data with a proper database for storing user accounts and URLs.
- **Querying with PostgreSQL:** replaced helper functions with actual SQL queries to handle data more robustly.
- **Basic testing:** introduced initial testing for main functionalities to ensure reliabaility and accuracy.
- **Enhanced URL management:**
  - Any logged-in user can view all stored URLs.
  - Only the owner of a URL can edit or delete it.

  ## User interface
  The main page has been lightly redesigned for improved clarity and access:
  - Displays all stored URLs to logged-in users.
  - Clear indicators show which URLs can be edited or deleted based on ownership.

  ## Final product
  !["Registration page allows a new user to create an account"](https://github.com/amusictheorist/tinyapp-express-v2.0/blob/main/docs/registration-page.png?raw=true)
  !["Login in page allows returning users to log back in or asks new users to register first"](https://github.com/amusictheorist/tinyapp-express-v2.0/blob/main/docs/login-page.png?raw=true)
  !["Main page displays community urls and disallows actions if user does not own the urls"](https://github.com/amusictheorist/tinyapp-express-v2.0/blob/main/docs/urls-page.png?raw=true)
  !["Create page allows a user to enter a new url to be shortened"](https://github.com/amusictheorist/tinyapp-express-v2.0/blob/main/docs/create-page.png?raw=true)
  !["Edit page allows a user to edit an existing saved url"](https://github.com/amusictheorist/tinyapp-express-v2.0/blob/main/docs/edit-page.png?raw=true)

  ## Dependencies
  ### Regular dependencies
  - bcrypt
  - cookie-pparser
  - dotenv
  - ejs
  - express
  - express-session
  - morgan
  - pg
  - pg-hstore
  ### Development dependencies
  - chai
  - mocha
  - nodemon

  ## Getting started

  1. **Clone the repository:**
```bash
  git clone https://github.com/amusictheorist/tinyapp-express-v2.0.git
```
2. **Install dependencies:**
```bash
npm install
```
3. **Set up the databse:**
- Ensure PostgreSQL is installed and running.
- Run the database reset script, which will execute the schema and seeds. It can also be used to reset the database at any point:
```bash
npm run db:reset
```
4. **Set up environment variables:**
- Create a `.env` file with the necessary credentials (refer to `.env.example`).
5. **Run the application:**
```bash
npm start
```
6. **Access the app:**
- Open your browser and navigate to `http://localhost:8080/`.

## Testing
Run the tests with the following command:
```bash
npm test
```

## License
This project is for personal use and is not licensed for distribution.

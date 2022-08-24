# Pet shelter SERVER
This is a server for a mock pet shelter. I used the MERN stack (MongoDB, Express, React.js, Node.js) and Redux for state management to huild the whole app. Functionality:
  * Registration:
    * With form validation.
    * Checks if email is taken or available. 
    * Creates a unique token.
  * Login:
    * With form validation.
    * Uses unique token to varify crudentials.
  * CRUD:
    * the homepage displays the posts that are fetched from the BE database.
    * if the user is logged in, you can:
      * create new posts (the form checks if the user entered valid information).
      * edit existing posts.
      * delete existing posts.
  * Passwords are NOT just stored in the BE - they're encrypted.
  * The layout of the navbar is different, depending if the person is logged in or not. 
  * Protected routing - if you are not logged in, you can't access restricted pages by entering the corresponding URL. 
  * Log out.

## System requirements:

  *  Node.js

## Project instructions:
  *  Rename src/config/.env.example file to .env
  *  Define variables:
    * DB_CONNECTION_UR= (MongoDB database connection URL)
    * TOKEN_SECRET= (unique token key)
    * Clone Front-end of the application and follow instructions in README.md file: 
      * [Front-end of the app](https://github.com/ARumiancev/PetShelter-FE)

## Instalation
  *  npm i

## Project scripts

    npm start - launch development server
    npm build - compile app

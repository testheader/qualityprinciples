# Quality prinicples

## Available Scripts

In the project directory, you can run:
### `npm start`
### `npm test`
### `npm run build`
### `npm run eject`

## Components and functionality
### Structure
Routing happens in App.js
  - `/` renders the home component to show one principle
  - `/overview` renders the overview component to show all principles
### Data
`resources/principles.json` contains all structured data
  - `title` contains the mnemonic or slogan
  - `description` contains the explanation
  - `sources` has a list of credits and further explanation 
### Components
  - `FirstTimeModel.js` is the model to quickly explain the idea of the website. Should only be shown once
  - `Home.js` displays the data and ways to share it
  - `Overview.js` displays all principles with a link to the specific page for ease of sharing
### Build & Deploy
- the code on `main` is published with netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/e63e4be6-95ee-44d2-aeac-452e8598e4fb/deploy-status)](https://app.netlify.com/sites/qualityprinciples/deploys)
- Each PR gets it own temporary link to try out. Netlify will add a comment in it.
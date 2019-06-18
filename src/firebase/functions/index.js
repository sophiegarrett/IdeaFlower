// index.js

const functions = require('firebase-functions');
const app = require('./express/app');

module.exports = {
  'app': functions.https.onRequest(app),
};

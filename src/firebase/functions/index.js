// index.js

const functions = require('firebase-functions');
const app = require('./express/app');
const createUser = require('./createUser');

module.exports = {
  'app': functions.https.onRequest(app),
  authOnCreate: functions.auth.user().onCreate(createUser),
};

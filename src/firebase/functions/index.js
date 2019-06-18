// index.js

const functions = require('firebase-functions');
const app = require('./express/app');
const createProfile = require('./createProfile');

module.exports = {
  'app': functions.https.onRequest(app),
  authOnCreate: functions.auth.user().onCreate(createProfile),
};

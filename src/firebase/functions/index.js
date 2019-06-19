// index.js

const functions = require('firebase-functions');
const app = require('./express/app');
const submitIdea = require('./submitIdea');
const createUser = require('./createUser');

module.exports = {
  'app': functions.https.onRequest(app),
  'submitIdea': functions.https.onCall(submitIdea),
  authOnCreate: functions.auth.user().onCreate(createUser),
};

// admin.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const database = admin.firestore();

module.exports = {
  database,
}

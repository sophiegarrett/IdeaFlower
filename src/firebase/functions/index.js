const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const exphbs = require('express-handlebars');
const engines = require('consolidate');
const path = require('path');

const site = require('./site');
const user = require('./user');

// Firebase config
const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

function getFacts() {
  const ref = firebaseApp.database().ref('facts');
  return ref.once('value').then(snap => snap.val());
}

// Express config
const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// General
app.get('/', site.index);

// User
app.get('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);

// 404
app.get('*', site.error404);

exports.app = functions.https.onRequest(app);

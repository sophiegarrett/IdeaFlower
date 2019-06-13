const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const path = require('path');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

function getFacts() {
  const ref = firebaseApp.database().ref('facts');
  return ref.once('value').then(snap => snap.val());
}

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  return getFacts().then(facts => {
     return res.render('index', { facts });
  });
});

app.use ((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '/static', '/404.html'));
});

exports.app = functions.https.onRequest(app);

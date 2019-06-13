const functions = require('firebase-functions');
const firebase = require("firebase");
const admin = require('firebase-admin');

const express = require('express');
const exphbs = require('express-handlebars');
const engines = require('consolidate');
const path = require('path');

// Firebase config
admin.initializeApp(functions.config().firebase);
const database = admin.firestore();
exports.getdb = function() {
  return database;
};

const site = require('./site');
const user = require('./user');
const idea = require('./idea');

// Express config
const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/posts', (req, res) => {
  database.collection('posts').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
    return null;
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
  res.send('Hello!');
});

// General
app.get('/', site.index);
app.get('/login', site.login);
app.get('/tos', site.tos);
app.get('/privacy', site.privacy);

// User
app.get('/users', user.list);
app.get('/user/:id', user.view);

// Idea
app.get('/ideas', idea.list);
app.all('/idea/:id/:op?', idea.load);
app.get('/idea/:id', idea.view);

// 404
app.get('*', site.error404);

exports.app = functions.https.onRequest(app);

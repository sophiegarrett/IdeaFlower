// app.js

const {
  database,
} = require('../admin');

const express = require('express');
const exphbs = require('express-handlebars');
const engines = require('consolidate');
const path = require('path');

const site = require('./site');
const user = require('./user');
const idea = require('./idea');

// Express config
const app = express();
app.engine('handlebars', exphbs());
app.set('views', './express/views');
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
app.get('/logout', site.logout);
app.get('/tos', site.tos);
app.get('/privacy', site.privacy);

// User
app.get('/user/:id', user.view);
app.get('/settings', user.settings);

// Idea
app.get('/ideas', idea.list);
app.get('/idea/:id', idea.view);
app.get('/submit', idea.submit);

// 404
app.get('*', site.error404);

module.exports = app;

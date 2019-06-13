const functions = require('firebase-functions');
const firebase = require("firebase");
const firebaseAdmin = require('firebase-admin');

const express = require('express');
const exphbs = require('express-handlebars');
const engines = require('consolidate');
const path = require('path');

const site = require('./site');
const user = require('./user');
const idea = require('./idea');

// Firebase config
const firebaseApp = firebaseAdmin.initializeApp(
  functions.config().firebase
);
const database = firebaseApp.database();

// Initialize the FirebaseUI Widget using Firebase.
//const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Express config
const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

// General
app.get('/', site.index);
app.get('/login', site.login);
app.get('/tos', site.tos);
app.get('/privacy', site.privacy);

// User
app.get('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);

// Idea
app.get('/ideas', idea.list);
app.all('/idea/:id/:op?', idea.load);
app.get('/idea/:id', idea.view);

// 404
app.get('*', site.error404);

exports.app = functions.https.onRequest(app);

const functions = require('firebase-functions');
const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'express', '/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'express', '/404.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'express', '/login.html'));
});

exports.app = functions.https.onRequest(app);

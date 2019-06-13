const functions = require('firebase-functions');
const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

exports.app = functions.https.onRequest(app);

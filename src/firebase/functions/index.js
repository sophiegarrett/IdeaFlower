const functions = require('firebase-functions');

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'express', '/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'express', '/login.html'));
});

app.use('/', router);

app.use ((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'express', '/404.html'));
});

exports.app = functions.https.onRequest(app);

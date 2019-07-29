// createUser.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {
  database,
} = require('./admin');

// Sets a newly-created user's displayName to a randomly-generated string.
// Adds a new user record to the database.
const createUser = (userRecord, context) => {
  var { displayName, uid } = userRecord;
  var new_name = newID();

  admin.auth().updateUser(uid, {
    displayName: new_name
  });

  displayName = new_name;

  return database
    .collection('users')
    .doc(uid)
    .set({ displayName })
    .catch(console.error);
};

const newID = function() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

module.exports = createUser;

// createUser.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Sets a newly-created user's displayName to a randomly-generated string.
const createUser = (userRecord, context) => {
  const { displayName, uid } = userRecord;
  var new_name = newID();

  admin.auth().updateUser(uid, {
    displayName: new_name
  });
};

const newID = function() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

module.exports = createUser;

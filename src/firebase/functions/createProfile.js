// createProfile.js

const {
  database,
} = require('./admin');

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
  const { displayName, uid } = userRecord;

  return database
    .collection('users')
    .doc(uid)
    .set({ displayName })
    .catch(console.error);
};

module.exports = createProfile;

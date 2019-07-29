// get_userinfo.js

// Function that fetches a user's data from the database.
async function getUserData(uid) {
  var database = firebase.firestore();
  var docRef = database.collection('users').doc(uid);

  var doc = await docRef.get();
  if (doc.exists) {
    return doc.data();
  } else {
    console.log("User does not exist.");
    return null;
  }
}

// Function that returns a user's display name.
async function getDisplayName(uid) {
  const userData = await getUserData(uid);
  console.log(userData.displayName);
  return userData.displayName;
}

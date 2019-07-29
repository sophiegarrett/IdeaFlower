// get_userinfo.js

// Function that fetches a user's data from the database.
getUserData = function(uid) {
  var database = firebase.firestore();
  var docRef = database.collection('users').doc(uid);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      var userData = doc.data();
    } else {
      console.log("User does not exist.");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  if (userData != null) {
    return userData;
  }
  else {
    console.log("Error getting user data.");
    return null;
  }
}

// Function that returns a user's display name.
getDisplayName = function(uid) {
  var userData = getUserData(uid);

  if (userData.displayName != null) {
    return userData.displayName;
  }
  else {
    console.log("Error getting display name.");
    return null;
  }
}

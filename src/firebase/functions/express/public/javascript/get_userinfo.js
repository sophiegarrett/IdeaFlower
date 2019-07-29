// get_userinfo.js

// Function that fetches a user's data from the database.
getUserData = function(uid) {
  var database = firebase.firestore();
  var docRef = database.collection('users').doc(uid);

  docRef.get().then(function(doc) {
    if (doc.exists) {
      return doc.data();
    } else {
      console.log("User does not exist.");
      return null;
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}

// Function that returns a user's display name.
getDisplayName = function(uid) {
  console.log(getUserData(uid));
  return "hello";
}

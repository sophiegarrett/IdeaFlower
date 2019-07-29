// user_settings.js

// Function that checks if a field is empty.
isEmpty = function(input) {
  return !input || !input.trim();
}

// Function that checks if a display name is valid.
isValidDisplayName = function(input) {
  var regexp = /^[a-zA-Z0-9-_]+$/;
  if (input.search(regexp) === -1) {
    return "Error: Display names can only contain letters, numbers, and underscores.";
  }
  else if (input.length < 3) {
    return "Error: Display names must be at least three characters long.";
  }
  else if (input.length > 25) {
    return "Error: Display names must be no more than 25 characters long.";
  }
  else {
    return "valid";
  }
}

// Function that updates a user's profile information in Firebase.
updateProfile = function(displayName) {
  var database = firebase.firestore();
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: displayName
  }).then(function() {
    return null;
  }).catch(function(error) {
    // An error occurred.
  });

  database.collection('users')
    .doc(user)
    .set({ displayName }, { merge: true })
    .catch(console.error);
}

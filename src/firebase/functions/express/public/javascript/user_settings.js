// user_settings.js

// Function that checks if a field is empty.
isEmpty = function(input) {
  return !input || !input.trim();
}

// Function that checks if a display name contains invalid characters.
isInvalid = function(input) {
  var regexp = /^[a-zA-Z0-9-_]+$/;
  if (input.search(regexp) === -1) {
    return true;
  }
  else {
    return false;
  }
}

// Function that updates a user's profile information in Firebase.
updateProfile = function(new_displayName) {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: new_displayName
  }).then(function() {
    return null;
  }).catch(function(error) {
    // An error occurred.
  });
}

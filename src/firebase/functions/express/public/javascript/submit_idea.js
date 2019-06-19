// submit_idea.js

// Function that checks if a field is empty.
isEmpty = function(input) {
  return !input || !input.trim();
}

// Function that checks if a title is valid.
isValidTitle = function(input) {
  var regexp = /^[a-zA-Z0-9 ]+$/;
  if (isEmpty(input)) {
    return "Error: Please add a title to your submission.";
  }
  else if (input.search(regexp) === -1) {
    return "Error: Idea titles can only contain letters, numbers, and spaces.";
  }
  else if (input.length < 3) {
    return "Error: Idea titles must be at least three characters long.";
  }
  else if (input.length > 80) {
    return "Error: Idea titles must be no more than 80 characters long.";
  }
  else {
    return "valid";
  }
}

// Function that checks if a description is valid.
isValidDescription = function(input) {
  // eslint-disable-next-line no-control-regex
  var regexp = /^[\x09-\x0A\x20-\x3B\x3D\x3F-\x7E]+$/;
  if (isEmpty(input)) {
    return "Error: Please add a description to your submission.";
  }
  else if (input.search(regexp) === -1) {
    return "Error: Idea description contains invalid characters. Note that < and > are not allowed.";
  }
  else if (input.length < 10) {
    return "Error: Idea descriptions must be at least ten characters long.";
  }
  else if (input.length > 2000) {
    return "Error: Idea descriptions must be no more than 2000 characters long.";
  }
  else {
    return "valid";
  }
}

// Function that adds a new idea to the database.
submitIdea = function(title, description) {
  var database = firebase.firestore();
  var user = firebase.auth().currentUser;
  var timestamp = firebase.firestore.FieldValue.serverTimestamp();

  database.collection("ideas").add({
    title: title,
    description: description,
    uid: user.uid,
    timestamp: timestamp
  })
  .then(function() {
    return null;
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

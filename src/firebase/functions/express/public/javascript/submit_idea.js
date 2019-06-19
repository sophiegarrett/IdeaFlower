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

// list_ideas.js

// Function that lists all ideas in the database.
listAllIdeas = function() {
  var database = firebase.firestore();
  var table = document.getElementById("idealist");

  database.collection("ideas")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var row = table.insertRow();
          var title_cell = row.insertCell(0);
          var user_cell = row.insertCell(1);
          var date_cell = row.insertCell(2);

          title_cell.innerHTML = "<a href='/idea/" + doc.id + "'>" + doc.data().title + "</a>";
          user_cell.innerHTML = doc.data().uid;
          date_cell.innerHTML = doc.data().timestamp;
        });
        return null;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

// Function that lists all ideas submitted by a specific user.
listUserIdeas = function(uid) {
  var database = firebase.firestore();
  var ideas = [];

  db.collection("ideas").where("uid", "==", uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var idea = {id: doc.id, title: doc.data().title, timestamp: doc.data().timestamp};
          ideas.push(idea);
        });
        return null;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

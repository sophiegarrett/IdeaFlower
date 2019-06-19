// list_ideas.js

// Function that converts a Firebase timestamp to a date string.
getDate = function(timestamp) {
  if (timestamp === null) {
    return "undefined";
  }
  else {
    var date = timestamp.toDate();
    var dateString = new Intl.DateTimeFormat('en-US').format(date);
    return dateString;
  }
}

// Function that lists all ideas in the database.
listAllIdeas = function() {
  var database = firebase.firestore();
  var table = document.getElementById("idealist");

  database.collection("ideas")
    .orderBy("timestamp", "desc")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var row = table.insertRow();
          var title_cell = row.insertCell(0);
          var date_cell = row.insertCell(1);

          title_cell.innerHTML = "<a href='/idea/" + doc.id + "'>" + doc.data().title + "</a>";
          date_cell.innerHTML = getDate(doc.data().timestamp);
        });

        // Display idea list and hide the loader
        document.getElementById('loader').classList.add("hidden");
        document.getElementById('idealist').classList.remove("hidden");
        return null;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

// Function that lists all ideas submitted by a specific user.
listUserIdeas = function(uid) {
  var database = firebase.firestore();
  var table = document.getElementById("idealist");

  database.collection("ideas").where("uid", "==", uid)
    .orderBy("timestamp", "desc")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var row = table.insertRow();
          var title_cell = row.insertCell(0);
          var date_cell = row.insertCell(1);

          title_cell.innerHTML = "<a href='/idea/" + doc.id + "'>" + doc.data().title + "</a>";
          date_cell.innerHTML = getDate(doc.data().timestamp);
        });

        // Display idea list and hide the loader
        document.getElementById('loader').classList.add("hidden");
        document.getElementById('idealist').classList.remove("hidden");
        return null;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

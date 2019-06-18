// user.js

const {
  database,
} = require('./admin');

exports.list = function(req, res) {
  var users = [];
  database.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      var user = {id: doc.id, name: doc.data().name};
      users.push(user);
    });
    res.render('users', { title: 'Users', users: users });
    return null;
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
};

exports.view = function(req, res) {
  var id = req.params.id;
  var userdoc = database.collection('users').doc(id).get()
    .then(doc => {
      if (!doc.exists) {
        console.log('Cannot find user ' + id);
        res.render('404', { title: 'Page Not Found' });
      } else {
        var user = {id: doc.id, name: doc.data().name};
        res.render('users/view', { title: 'Viewing user ' + user.name, user: user });
      }
      return null;
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
};

exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var user = req.body.user;
  req.user.name = user.name;
  req.user.email = user.email;
  res.redirect('back');
};

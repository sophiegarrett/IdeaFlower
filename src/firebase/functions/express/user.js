// user.js

const admin = require('firebase-admin');
const {
  database,
} = require('../admin');

exports.view = function(req, res) {
  var id = req.params.id;
  admin.auth().getUser(id)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      var user = {id: userRecord.uid, name: userRecord.displayName};
      res.render('users/view', { title: 'Viewing user ' + user.name, user: user });
      return null;
    })
    .catch(function(error) {
      console.log('Error fetching user data:', error);
      res.render('404', { title: 'Page Not Found' });
    });
};

exports.settings = function(req, res) {
  res.render('users/settings', { title: 'User Settings' });
}

exports.welcome = function(req, res) {
  res.render('users/welcome', { title: 'Welcome' });
}

exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var user = req.body.user;
  req.user.name = user.name;
  req.user.email = user.email;
  res.redirect('back');
};

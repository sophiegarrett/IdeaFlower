// user.js

const {
  database,
} = require('../admin');

exports.view = function(req, res) {
  var id = req.params.id;
  var userdoc = database.collection('users').doc(id).get()
   .then(doc => {
     if (!doc.exists) {
       console.log('Cannot find user ' + id);
       res.render('404', { title: 'Page Not Found' });
     } else {
       var user = {id: doc.id, name: doc.data().displayName};
       res.render('users/view', { title: 'Viewing user ' + user.name, user: user });
     }
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

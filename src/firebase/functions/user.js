const admin = require('firebase-admin');
const index = require('./index');
const database = index.getdb();

// Fake user database
var users = [
  { name: 'TJ', email: 'tj@vision-media.ca' },
  { name: 'Tobi', email: 'tobi@vision-media.ca' }
];

exports.list = function(req, res) {
  database.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
    return null;
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
  res.render('users', { title: 'Users', users: users });
};

exports.load = function(req, res, next){
  var id = req.params.id;
  req.user = users[id];
  if (req.user) {
    return next();
  } else {
    var err = new Error('cannot find user ' + id);
    err.status = 404;
    return next(err);
  }
};

exports.view = function(req, res) {
  res.render('users/view', {
    title: 'Viewing user ' + req.user.name,
    user: req.user
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

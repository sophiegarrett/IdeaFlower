// idea.js

const {
  database,
} = require('../admin');

exports.list = function(req, res) {
  res.render('ideas', { title: 'Ideas' });
};

exports.view = function(req, res) {
  var id = req.params.id;
  var ideadoc = database.collection('ideas').doc(id).get()
    .then(doc => {
      if (!doc.exists) {
        console.log('Cannot find idea ' + id);
        res.render('404', { title: 'Page Not Found' });
      } else {
        var idea = {id: doc.id, title: doc.data().title, description: doc.data().description, uid: doc.data().uid};
        res.render('ideas/view', { title: idea.title, idea: idea });
      }
      return null;
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
};

exports.submit = function(req, res) {
  res.render('ideas/submit', { title: 'Submit an Idea' });
}

exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var idea = req.body.idea;
  req.idea.title = idea.title;
  req.idea.user = idea.user;
  res.redirect('back');
};

// Fake idea database
var ideas = [
  { title: 'A Bright Idea', user: 'TJ' },
  { title: 'Underwater Basket Weaving', user: 'Tobi' }
];

exports.list = function(req, res) {
  res.render('ideas', { title: 'Ideas', ideas: ideas });
};

exports.load = function(req, res, next){
  var id = req.params.id;
  req.idea = ideas[id];
  if (req.idea) {
    return next();
  } else {
    var err = new Error('cannot find idea ' + id);
    err.status = 404;
    return next(err);
  }
};

exports.view = function(req, res) {
  res.render('ideas/view', {
    title: req.idea.title,
    idea: req.idea
  });
};

exports.update = function(req, res){
  // Normally you would handle all kinds of
  // validation and save back to the db
  var idea = req.body.idea;
  req.idea.title = idea.title;
  req.idea.user = idea.user;
  res.redirect('back');
};

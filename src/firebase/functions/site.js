exports.index = function(req, res) {
  res.render('index', { title: 'Home' });
}

exports.404 = function(req, res, next) {
  res.render('404', { title: '404' });
}

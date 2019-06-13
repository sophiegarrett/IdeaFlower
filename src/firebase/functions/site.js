exports.index = function(req, res) {
  res.render('index', { title: 'Home' });
}

exports.error404 = function(req, res, next) {
  res.render('404', { title: 'Page Not Found' });
}

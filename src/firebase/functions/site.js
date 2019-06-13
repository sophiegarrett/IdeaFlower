exports.index = function(req, res) {
  res.render('index', { title: 'Home' });
}

exports.login = function(req, res) {
  res.render('login', { title: 'Log In' });
}

exports.error404 = function(req, res, next) {
  res.render('404', { title: 'Page Not Found' });
}

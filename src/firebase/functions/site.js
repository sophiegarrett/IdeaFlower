exports.index = function(req, res) {
  res.render('index', { title: 'Home' });
}

exports.login = function(req, res) {
  res.render('login', { title: 'Log In' });
}

exports.tos = function(req, res) {
  res.render('tos', { title: 'Terms of Service' });
}

exports.privacy = function(req, res) {
  res.render('privacy', { title: 'Privacy Policy' });
}

exports.error404 = function(req, res, next) {
  res.render('404', { title: 'Page Not Found' });
}

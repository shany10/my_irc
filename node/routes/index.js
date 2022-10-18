
exports.login = function (req, res) {
  res.render('login', { title: "login", });
};

exports.home = function (req, res) {
  res.render('home', { title: "home" , userName: req.body.name});
};
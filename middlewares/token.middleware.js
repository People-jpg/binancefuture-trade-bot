const jwt = require('jsonwebtoken');

module.exports.verifyToken = function (req, res, next) {
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect('/');
    return;
  }

  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch(err) {
    res.redirect('/');
  }
}
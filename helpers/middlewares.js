const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

exports.validationLoggin = () => (req, res, next) => {
  const { teamName, password, email } = req.body;
  console.log(req.body)
  if (!teamName || !password || !email) next(createError(400));
  else next();
}

exports.validationSignUp = () => (req, res, next) => {
  const { teamName, email, password, playerName1, playerName2, dniPlayer2 } = req.body;

  if (!teamName || !email || !password || !playerName1 || !dniPlayer1 || !playerName2  || !dniPlayer2 ) next(createError(400));
  else next();
}

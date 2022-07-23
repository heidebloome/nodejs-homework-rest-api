const signup = require('./signup');
const verifyEmail = require('./verifyEmail');
const resentVerificationMail = require('./resentVerificationMail');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateAvatar = require('./updateAvatar');

module.exports = {
  signup,
  verifyEmail,
  resentVerificationMail,
  login,
  getCurrent,
  logout,
  updateAvatar,
}
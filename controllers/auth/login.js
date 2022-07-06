const { User } = require('../../models/user');
const { createError } = require('../../utils');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401);
  };
  if (!bcrypt.compare(password, user.password)) {
    throw createError(401);
  };
  const token = "lfmlsfkvnldjfnvljsfnv";
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    }
  });
};

module.exports = login;
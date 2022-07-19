const { User } = require('../../models/user');
const { createError } = require('../../utils');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409);
  };
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const createdUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
  res.status(201).json({
    user: {
      email: createdUser.email,
      subscription: "starter",
      avatarURL
  }
  })
};

module.exports = signup;
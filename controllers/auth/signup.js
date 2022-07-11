const { User } = require('../../models/user');
const { createError } = require('../../utils');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409);
  };
  const hashPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: createdUser.email,
      subscription: "starter",
  }
  })
};

module.exports = signup;
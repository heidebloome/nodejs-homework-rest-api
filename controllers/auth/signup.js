const { User } = require('../../models/user');
const { createError, sendMail } = require('../../utils');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409);
  };

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const createdUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken
  });

  const mail = {
    to: email,
    subject: 'Verify your email',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Verify your email</a>`
  };
  await sendMail(mail);

  res.status(201).json({
    user: {
      email: createdUser.email,
      subscription: "starter",
      avatarURL
  }
  })
};

module.exports = signup;
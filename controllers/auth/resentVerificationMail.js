const { User } = require('../../models/user');
const { createError, sendMail } = require('../../utils');

const resentVerificationMail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, 'User not found');
  };
  if (user.verify) {
    throw createError(400, 'Verification has already been passed');
  };

  const mail = {
    to: email,
    subject: 'Verify your email',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Verify your email</a>`
  };
  await sendMail(mail);
  res.json({
    message: 'Verification email sent',
  });
};

module.exports = resentVerificationMail;
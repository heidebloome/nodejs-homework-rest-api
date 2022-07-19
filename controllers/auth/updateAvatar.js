const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { _id } = req.user;
  const [extension] = originalname.split('.').reverse();

  const avatarToResize = await Jimp.read(tempPath);
  avatarToResize.resize(250, 250);
  await avatarToResize.writeAsync(tempPath);

  const newAvatarName = `${_id}.${extension}`;
  const avatarPath = path.join(avatarsDir, newAvatarName);
  await fs.rename(tempPath, avatarPath);

  const avatarURL = path.join('avatars', newAvatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL
  });
};

module.exports = updateAvatar;
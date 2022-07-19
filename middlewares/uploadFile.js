const multer = require('multer');
const path = require('path');

const tmpDir = path.join(__dirname, '../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  fileName: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1024,
  }
});

const uploadFile = multer({
  storage: multerConfig,
});

module.exports = uploadFile;
const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../utils');
const { validation, isAuthenticated, uploadFile } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(schemas.signupSchema), ctrlWrapper(ctrl.signup));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post('/verify', validation(schemas.verificationEmailSchema), ctrlWrapper(ctrl.resentVerificationMail));
router.post('/login', validation(schemas.signupSchema), ctrlWrapper(ctrl.login));
router.get('/current', isAuthenticated, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', isAuthenticated, ctrlWrapper(ctrl.logout));
router.patch('/avatars', isAuthenticated, uploadFile.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
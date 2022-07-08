const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../utils');
const { validation, isAuthenticated } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(schemas.signupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(schemas.signupSchema), ctrlWrapper(ctrl.login));
router.get('/current', isAuthenticated, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', isAuthenticated, ctrlWrapper(ctrl.logout));

module.exports = router;
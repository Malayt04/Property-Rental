const express = require('express');
const {getUserLogin, postLogin, getUserSignUp, postSignUp,logout} = require('../controller/authController.js');
const router = express.Router();

router.route('/signup').get(getUserSignUp);
router.route('/signup').post(postSignUp);
router.route('/login').get(getUserLogin);
router.route('/login').post(postLogin);
router.route('/logout').get(logout);

module.exports = router;

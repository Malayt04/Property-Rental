const express = require('express');
const {addPropertyPage, postPropertyPage,getProperties, getMyListings, deleteListing} = require('../controller/addProperties.js');
const router = express.Router();
const requireCookie = require("../middleware/checkAuth.js")

router.route('/addproperty').get(addPropertyPage);
router.route('/addproperty').post(postPropertyPage);
router.route('/mylistings').get(getMyListings);
router.route('/delete/:id').post(deleteListing);
router.route('/').get(requireCookie,getProperties);

module.exports = router;
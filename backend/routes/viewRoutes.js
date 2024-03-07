const express = require('express');
const cors = require('cors');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(cors());

router.use(authController.isLoggedIn);

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/overview-data', authController.isLoggedIn, viewsController.getOverviewData);
router.get('/report/:slug', authController.isLoggedIn, authController.protect, viewsController.getReport);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.post('/submit-user-data', authController.protect, viewsController.updateUserData);

module.exports = router;

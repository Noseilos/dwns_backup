const express = require('express');
const reportsController = require('../controllers/reportsController');
const authController = require('../controllers/authController');
const reviewsRouter = require('./reviewsRoutes');

const router = express.Router();
// router.param('id', reportsController.checkId);

router.use(`/:reportId/reviews`, reviewsRouter);

router
  .route(`/top-5-cheapest`)
  .get(reportsController.aliasTopTours, reportsController.getAllReports);

router.route('/report-stats').get(reportsController.getReportStats);
router
  .route('/monthly-plan/:year')
  .get(
    reportsController.getMonthlyPlan,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    reportsController.createReports,
  );

router
  .route(`/reports-within/:distance/center/:latlng/unit/:unit`)
  .get(reportsController.getReportsWithin);

router
  .route(`/distances/:latlng/unit/:unit`)
  .get(reportsController.getDistances);

router
  .route(`/`)
  .get(reportsController.getAllReports)
  .post(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'), 
    reportsController.createReports
  );

router
  .route(`/:id`)
  .get(reportsController.getAllReportsById)
  .patch(
    authController.protect, 
    authController.restrictTo('admin', 'lead-guide'), 
    reportsController.uploadReportImages,
    reportsController.resizeReportImages,
    reportsController.updateReportsById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    reportsController.deleteReportsById,
  );

module.exports = router;

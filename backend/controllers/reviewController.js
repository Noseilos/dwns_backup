const Review = require('../models/reviewsModel')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync');

exports.setReportUserIds = async(req, res, next) => {
    if (!req.body.report) {
        req.body.report = req.params.reportId
    }
    if (!req.body.user) {
        req.body.user = req.user.id
    }
    next()
}

exports.checkDuplicateReview = catchAsync(async (req, res, next) => {
    const { report, user } = req.body;
  
    // Check if the user has already submitted a review for the report
    const existingReview = await Review.findOne({ report, user });
  
    if (existingReview) {
      return res.status(400).json({
        status: 'fail',
        message: 'Report can only be reviewed once by a user',
      });
    }
  
    // If no existing review, proceed to the next middleware
    next();
  });

exports.getAllReviews = factory.getAll(Review)

exports.getReviewById = factory.getOne(Review)

exports.createNewReview = factory.createOne(Review)

exports.updateReviewsById = factory.updateOne(Review)

exports.deleteReviewsById = factory.deleteOne(Review)
const mongoose = require('mongoose');
const Report = require('./reportsModel');

const reviewsSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    report: {
      type: mongoose.Schema.ObjectId,
      ref: 'Reports',
      required: [true, 'Review must have a report'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user'],
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

reviewsSchema.index(
  { report: 1, user: 1 },
  { unique: true }
)

reviewsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewsSchema.statics.calcAverageRatings = async function (reportId) {
  const stats = await this.aggregate([
    {
      $match: { report: reportId },
    },
    {
      $group: {
        _id: '$report',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Report.findByIdAndUpdate(reportId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Report.findByIdAndUpdate(reportId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewsSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.report);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewsSchema.pre(/^findOneAnd/, async function(next){

  const docId = this.getQuery()._id;

  try {

    this.review = await this.model.findById(docId);
    console.log('Document before update:', this.review);

  } catch (error) {

    console.error('Error fetching document before update:', error);
  }

  next();
})

reviewsSchema.post(/^findOneAnd/, async function(){
  await this.review.constructor.calcAverageRatings(this.review.report)
})

const Review = mongoose.model('Reviews', reviewsSchema);

module.exports = Review;

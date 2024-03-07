const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
const reportsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A report must have a name'],
    },
    slug: String,
    discreteReport: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: [true, 'A report must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A report must have a group size'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating cannot be below 1.00'],
      max: [5, 'Rating cannot be below 5.00'],
      set: val => Math.round( val * 10 ) / 10
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      required: [true, 'A report must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty value can only be: easy/ medium/ difficult',
      },
    },
    price: {
      type: Number,
      required: [true, 'A report must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return this.price > val;
        },
        message:
          'Discount price ({VALUE}) should be less than or equal to price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A report must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A report must have an image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ 
      type: mongoose.Schema.ObjectId, 
      ref: 'User' 
    }],
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

reportsSchema.index({ price: 1, ratingsAverage: -1 })
reportsSchema.index({ slug: 1 })
reportsSchema.index({ startLocation: '2dsphere' })

reportsSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

reportsSchema.virtual('reviews', {
  ref: 'Reviews',
  foreignField: 'report',
  localField: '_id'
})

reportsSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// reportsSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async id => User.findById(id));
//   this.guides = await Promise.all(guidesPromises)
//   next();
// });

// QUERY MIDDLEWARE
reportsSchema.pre(/^find/, function (next) {
  this.find({ discreteReport: { $ne: true } });

  this.start = Date.now();
  next();
});

reportsSchema.pre(/^find/, function(next){
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
  next()
})

reportsSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});


// AGGREGATION MIDDLEWARE
// reportsSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { discreteReport: { $ne: true } } });
//   next();
// });

const Reports = mongoose.model('Reports', reportsSchema);

module.exports = Reports;

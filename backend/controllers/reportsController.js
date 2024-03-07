const multer = require('multer');
const sharp = require('sharp');
const Reports = require('../models/reportsModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
});

exports.uploadReportImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 }
])

exports.resizeReportImages = catchAsync(async (req, res, next) => {
  console.log(req.files)

  if(!req.files.imageCover || !req.files.images) {
    return next()
  }

  // 1) Cover image
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/reports/${req.body.imageCover}`);

  // 2) Images
  req.body.images = []

  await Promise.all(
    req.files.images.map(async(file, i) => {
      const fileName = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`
      
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/reports/${fileName}`);

      req.body.images.push(fileName)
  }))


  next()
})

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllReports = factory.getAll(Reports);
exports.getAllReportsById = factory.getOne(Reports, { path: 'reviews' });
exports.createReports = factory.createOne(Reports);
exports.updateReportsById = factory.updateOne(Reports);
exports.deleteReportsById = factory.deleteOne(Reports);
// exports.deleteReportsById = catchAsync(async (req, res, next) => {
//   const report = await Reports.findByIdAndDelete(req.params.id);

//   if (!report) {
//     return next(new AppError('No report found with that ID', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     message: 'Deleted report',
//     data: report,
//   });
// });

exports.getReportStats = catchAsync(async (req, res, next) => {
  const stats = await Reports.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numReports: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Reports.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numStartDates: { $sum: 1 },
        reports: { $push: '$name' },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numStartDates: 1 },
    },
    // {
    //   $limit: 6
    // }
  ]);

  res.status(200).json({
    status: 'success',
    data: plan,
  });
});

// /tours-within/:distance/center/:latlng/unit/:unit
exports.getReportsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        `Please provide latitude and longitude in the format lat, lng.`,
        400,
      ),
    );
  }

  const reports = await Reports.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  // console.log({distance, lat, lng, unit});

  res.status(200).json({
    status: 'success',
    results: reports.length,
    data: {
      data: reports,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    return next(
      new AppError(
        `Please provide latitude and longitude in the format lat, lng.`,
        400,
      ),
    );
  }

  const distance = await Reports.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: distance.length,
    data: {
      data: distance,
    },
  });
});

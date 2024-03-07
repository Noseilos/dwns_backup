const Report = require('../models/reportsModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res) => {
  // 1 Get data from collection
  const reports = await Report.find();
  // 2 Build template
  // 3 Render template using data from step 1
  res.status(200).render('overview', {
    title: 'All Reports',
    reports,
  });
});
exports.getOverviewData = catchAsync(async (req, res) => {
  // Get data from collection
  const reports = await Report.find();

  res.status(200).json({
    status: 'success',
    data: {
      reports,
    },
  });
});
exports.getReport = catchAsync(async (req, res, next) => {
  // 1 get the data, for the requested report
  const report = await Report.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!report) {
    return next(new AppError('There is no report with that name', 404));
  }
  // 2 build template
  // 3 render template using report data

  res.status(200).render('report', {
    title: `${report.name} Report`,
    report,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {});
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

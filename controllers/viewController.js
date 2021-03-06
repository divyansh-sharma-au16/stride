const Stream  = require('../models/streamModel');
const catchAsync = require('../utils/catchAync');
const AppError = require('../utils/appError');

exports.getOveriew = (req, res) => {
  res.status(200).render('overview', {
    title: 'overview about us',
  });
};

exports.getStreams = catchAsync(async (req, res, next) => {
  //get allGradens data from collection
  const streams = await Stream.find();
  //build and render template using allGardens data from step 1

  if (!streams) {
    return next(new AppError('There is no show available with that name.', 404));
  }
  res.status(200).render('streams', {
    title: 'Visit our streams',
    streams,
  });
});

//build template and render it.

// exports.getGarden = catchAsync(async(req, res,next)=>{

//   //get the specific garden from collection
//   const garden = await (await Garden.findOne({slug: req.params.slug})).populate({
//     fields:'review rating user'
//   });

//   //build and render template using that collection data

//   res.status(200).render('garden',{
//     title: 'The Veggies Garden',
//     getGarden
//   });
// });
exports.getSingupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'create your account!',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Welcome to your account',
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
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

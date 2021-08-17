const Stream = require('./../models/streamModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAync');
const AppError = require('./../utils/appError');

exports.getAllStreams = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Stream.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const streams = await features.query;

  res.status(200).json({
    status: 'success',
    results: streams.length,
    data: {
      streams,
    },
  });
});

exports.addStream = catchAsync(async (req, res, next) => {
  const newStream = await Stream.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      stream: newStream,
    },
  });
});

exports.getStream = catchAsync(async (req, res, next) => {
  const stream = await Stream.findById(req.params.id);

  if (!stream) {
    return next(new AppError('no garden found with this ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      stream,
    },
  });
});

exports.updateStream = catchAsync(async (req, res, next) => {
  const stream = await Stream.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!stream) {
    return next(new AppError('no garden found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      stream,
    },
  });
});

exports.deleteStream = catchAsync(async (req, res) => {
  const stream = await Stream.findByIdAndDelete(req.params.id);

  if (!stream) {
    return next(new AppError('no garden found with this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

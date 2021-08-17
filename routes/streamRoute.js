const express = require('express');
const streamController = require('./../controllers/streamController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, streamController.getAllStreams)
  .post(streamController.addStream);
router
  .route('/:id')
  .get(streamController.getStream)
  .patch(streamController.updateStream)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    streamController.deleteStream
  );

module.exports = router;

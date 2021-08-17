const mongoose = require('mongoose');
const slugify = require('slugify');

const streamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a stream must have a name'],
    unique: true,
    trim: true,
  },
  slug: String,
  imageCover: {
    type: String,
    required: [true, 'a stream must have a cover image'],
  },
  Cast:{
    type: Array,
    required: [true, 'a stream must have cast members details'],
    unique: true,
    trim: true,
  },
  summary:{
    type: String,
    required: [true, 'a stream must have a summary'],
    unique: true,
    trim: true,
  },
  releaseDate: {
    required: [true, 'a stream must have a release date available'],
    type: Date,
    trim: true,
  },
  availability: {
    required: [true, 'a stream must have availability specification'],
    type: String,
    trim: true,
  },
  seasons: {
    required: [true, 'a stream must have number of seasons available'],
    type: Number,
    trim: true,
  },
  ottAvailableOn: {
    required: [true, 'a stream must have a OTT platform on which it is available'],
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'A stream package must have a price'],
    default: 100
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity:{
    type:Number,
    default:5,
  },
  price:{
    type: Number,
    required: [true, 'a stream must have a price which is amount*100, since stripe conversions are complex'],
    default: 10000
  }
});

streamSchema.index({ slug: 1 });
streamSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});


const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;

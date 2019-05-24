import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Product = new Schema({
  title: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Product', Product);

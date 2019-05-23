// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
  title: String,

  description: String,
  image: String,

  price: Number,
  quantity: Number
    

});

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = Product;

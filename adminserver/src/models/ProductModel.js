const mongoose = require('mongoose');
const autoIncrementModelID = require('./counterModel');
 
const ProductSchema = new mongoose.Schema({
    // name: String,
    // keywords: [String],
    // desc : String,
    // brand : String,
    // imageURI: String,
    // price : Number
}, { strict: false });
 
ProductSchema.pre('save', function (next) {
    console.log('Product pre Save.')
    if (!this.isNew) {
      next();
      return;
    }
    autoIncrementModelID('productId', this, next);
  }); 

ProductSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  return obj;
  }

const ProductModel = mongoose.model('Product', ProductSchema, 'product');
 
module.exports = ProductModel
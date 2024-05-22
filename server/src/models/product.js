const mongoose = require('mongoose');
// const client = require('../../config/solrClient')

const Schema = mongoose.Schema

const ProductSchema = new Schema({}, { strict: false });

// ProductSchema.pre('save', function (next) {
//     // Update document to Solr server
//     client.update(this, function(err, result) {
//         if (err) {
//          console.log(err);
//          return;
//         }
//         console.log('Response:', result.responseHeader);
//     });
// });

var Product = mongoose.model('Product', ProductSchema, 'product');

module.exports = Product;
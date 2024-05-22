const Category = require('../../models/category');
const Product = require('../../models/product');
const Sku = require('../../models/sku');

var bluebird = require('bluebird');
var redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// const client = redis.createClient(6379,'cache');

class catalogRepo {

    static async getsku(id) {
        // var value = await client.getAsync('sku_' + id)
        // if (value) {
        //     return JSON.parse(value);
        // } else {
            var skurepo = await Product.findOne({'Id': parseInt(id)}).exec();
            // client.set('sku_' + id, JSON.stringify(skurepo[0].toJSON()));
            console.log(skurepo)
            return skurepo.toJSON();
        // }
    }

    static async getproduct(id) {
        // var value = await client.getAsync('prd_' + id)
        // if (value) {
        //     console.log(JSON.parse(value))
        //     return JSON.parse(value);
        // } else {
            var prdrepo = await Product.findOne({ 'Id': parseInt(id) }).exec();
            // client.set('prd_' + id, JSON.stringify(prdrepo[0].toJSON()));
            return prdrepo.toJSON();
        // }
    }

    static getcategory(id) {
        return Category.find({id:id});
    }

}

module.exports = catalogRepo;
const MONGO_HOST = process.env.MONGO_SERVICE_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_SERVICE_PORT || 27017;
const JWT_KEY = process.env.JWT_KEY || 'Ecom-AuthJWT@2020';
const A_EXPIRE_TIME = process.env.A_EXPIRE_TIME || 5;

const CHECKOUT_HOST = process.env.CHECKOUT_SERVICE_HOST || 'checkoutserver';
const CHECKOUT_PORT = process.env.CHECKOUT_SERVICE_PORT || 8000;
const CATALOG_HOST = process.env.CATALOG_SERVICE_HOST || 'node';
const CATALOG_PORT = process.env.CATALOG_SERVICE_PORT || 5000;

module.exports = {
    mongoURI:'mongodb://root:example@'+MONGO_HOST+':'+MONGO_PORT+'/ecomadmin',
    JWTSecertKey:JWT_KEY,
    accessExpireTime:A_EXPIRE_TIME+'d',
    checkout_baseurl:'http://'+CHECKOUT_HOST+':'+CHECKOUT_PORT,
    catalog_baseurl:'http://'+CATALOG_HOST+':'+CATALOG_PORT
}
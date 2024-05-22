
let SERVER_HOST=process.env.SITEHOST || 'http://localhost/';

const MONGO_HOST = process.env.MONGO_SERVICE_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_SERVICE_PORT || 27017;
const JWT_KEY = process.env.JWT_KEY || 'Ecom-AuthJWT@2019';
const CATALOG_HOST = process.env.CATALOG_SERVICE_HOST || 'node';
const CATALOG_PORT = process.env.CATALOG_SERVICE_PORT || 5000;

const RAZORPAY_KEY = process.env.RAZORPAY_KEY || '<razor_pay_key>';
const RAZORPAY_SKEY = process.env.RAZORPAY_SKEY || '<razor_pay_sceret_key>';

const NOTIFICATION_HOST = process.env.NOTIFICATION_HOST || 'notificationserver';
const NOTIFICATION_PORT = process.env.NOTIFICATION_PORT || 8082;

module.exports = {
mongoURI:'mongodb://root:example@'+MONGO_HOST+':'+MONGO_PORT+'/ecomorder',
JWTSecertKey:JWT_KEY,
catalog_baseurl:'http://'+CATALOG_HOST+':'+CATALOG_PORT,
notification_baseurl:'http://'+NOTIFICATION_HOST+':'+NOTIFICATION_PORT,
RazorpayKey:RAZORPAY_KEY,
RazaorpaySecertKey:RAZORPAY_SKEY,
site_baseurl:SERVER_HOST
}
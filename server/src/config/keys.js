
const MONGO_HOST = process.env.MONGO_SERVICE_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_SERVICE_PORT || 27017;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';

module.exports = {
    mongoURI:'mongodb://root:example@'+MONGO_HOST+':'+MONGO_PORT+'/ecomcatalog',
    redisPort: REDIS_PORT,
    redisHost: REDIS_HOST
}
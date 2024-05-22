const express = require('express');
const mongoose = require('mongoose');
const promMid = require('express-prometheus-middleware');
let middleware = require('./utils/middleware');
const bodyParser = require('body-parser');
const orderApi = require('./routes/orderApi')
const paymentApi = require('./routes/paymentApi')
const checkoutApi = require('./routes/checkoutApi')
const trackingApi = require('./routes/trackingApi')
const adminApi = require('./routes/admin')
const ShippingRepo = require('./models/shipping')
var shippingMethodRepo = require('./config/shippingMethods.json')

const app = express();

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
  }));

var log4js = require('log4js');
//Logging
require('./utils/logger')
var log = log4js.getLogger("app");
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./config/keys').mongoURI

//config.init('http://authserver:9000');

mongoose
    .connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e));

app.get('/api/o/ping',(req, res)=>{
    console.log('Checkout Server');
    res.status(200).json({message:'CS.Hello World'})
});

app.use('/api/o/checkout/',middleware.checkToken, middleware.updateStore,checkoutApi);
app.use('/api/o/pay/', middleware.updateStore, paymentApi);
app.use('/api/ot/',middleware.checkToken, middleware.updateStore, trackingApi);
app.use('/api/o/',middleware.checkToken, middleware.updateStore, orderApi);
app.use('/api/admin/o/',adminApi);

app.post('/api/config/loadShippingMethod', (req, res)=>{
    ShippingRepo.create(shippingMethodRepo)
    res.status(201).json({msg:'Created the Shipping Methods.'})
});

const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log('Checkout Server running on port ' + port))
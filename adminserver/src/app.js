var express = require('express');
const promMid = require('express-prometheus-middleware');
var app = express();
var log4js = require('log4js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/keys');
let middleware = require('./utils/middleware');

const login = require('./routes/login')
const oms = require('./routes/oms')
const pms = require('./routes/pms')
const superadmin = require('./routes/superadmin')

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
  }));

//Logging
require('./utils/logger')
var log = log4js.getLogger("app");
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/admin/static/', express.static('public'));

app.use('/api/admin/o/', middleware.checkToken, middleware.updateStore, oms);
app.use('/api/admin/p/', middleware.checkToken, middleware.updateStore, pms);
app.use('/api/admin/a/', login);

app.use('/api/superadmin/', superadmin);


app.get('/api/admin/ping',(req, res)=>{
    console.log('admin Server');
    res.status(200).json({message:'This is Admin Sever, Hello World'})
});


var server = app.listen(6000, function() {
  var host = 'localhost';
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);

  mongoose.connect(config.mongoURI , { useNewUrlParser: true });
    mongoose.connection.once('open', () => {
        console.info('Connected to Mongo via Mongoose');
    });
    mongoose.connection.on('error', (err) => {
        console.error('Unable to connect to Mongo via Mongoose', err);
    });
});
var express = require('express');
const promMid = require('express-prometheus-middleware');
var app = express();
const bodyParser = require('body-parser');
var mail = require('./routes/mail')
var sms = require('./routes/sms');
var log4js = require('log4js');

//Logging
require('./utils/logger')
var log = log4js.getLogger("app");
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('app'));

// app.post('/api/mail/sendOrderConfirmation', (req, res)=>{
//   res.status(200).json("OK")
// })
app.use('/api/mail/',mail)
app.use('/api/sms/',sms)


var server = app.listen(8082, function() {
  var host = 'localhost';
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
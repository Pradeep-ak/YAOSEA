const express = require('express');
const mongoose = require('mongoose');
const promMid = require('express-prometheus-middleware');
const config = require('./config/keys');
const bodyParser = require('body-parser');
const api = require('./routes/api')

const app = express();

mongoose
    .connect(config.mongoURI)
    .then(()=>console.log('MongoDB Connected'))
    .catch((e)=>console.log(e));

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400]
    }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/au/ping',(req, res)=>{
    console.log('Auth Server');
    res.status(200).json({message:'Hello World'})
});

app.use('/api/au',api);

app.use('/api/au/config', express.static('config'))

const port = process.env.PORT || 9000;
app.listen(port, ()=> console.log('Auth Server running on port ' + port))
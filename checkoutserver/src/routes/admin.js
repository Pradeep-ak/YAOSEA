const express = require('express');
const trackingService = require('../service/trackingService')
const router = express.Router();

router.get('/orders', async(req, res)=>{
    console.log('In orders')
    try {
        var data = await trackingService.getOrders(req.query.stdate, req.query.eddate);
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json({});
        console.log(err)
    };
});

router.get('/order', async(req, res)=>{
    console.log('In orders')
    try {
        var data = await trackingService.getSubmittedOrderFromId(req.query.orderId);
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json({});
        console.log(err)
    };
});

module.exports=router;
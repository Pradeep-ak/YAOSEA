const express = require('express');
const utils = require('../utils/utils')
const key = require('../config/keys')
const axios = require('axios');
const omsService = require('../service/omsService')

const router = express.Router();

router.get('/orders', async(req, resp, next)=>{
    console.log(req.query);
    const dateRange = req.query.range;
    var dates = dateRange.trim().split('-');
    if(dates.length ===2 
        && utils.isValidDate(dates[0].trim()) 
        && utils.isValidDate(dates[1].trim())){
        var minDate = new Date().addDays(-30).getTime()/1000;
        const stdate = utils.parseDate(dates[0].trim()).getTime()/1000;
        const eddate = utils.parseDate(dates[1].trim()).getTime()/1000;
        //Validate the input data.
        // if(minDate > stdate){
        //     return resp.status(404).json({msg:'Start date should with in 30 days from Today.'})
        // } else if(2505600 < (eddate-stdate)) {
        //     return resp.status(404).json({msg:'Period should be with in 30 days.'})
        // } else if(eddate < stdate){
        //     return resp.status(404).json({msg:'End Date should be after Start Date'})
        // }
        try{
            await axios.get(key.checkout_baseurl+'/api/admin/o/orders?stdate='+stdate+'&eddate='+eddate).then(response=>{
                return resp.status(200).json({
                    'orders':omsService.mapOrders2Resposne(response.data),
                    'downloadLink':'/api/admin/o/downloadOrders?range='+dateRange
                })
            }).catch(err=>{
                console.log(err)
                return resp.status(404).json({msg:'No Orders found for time'})
            });
        }catch(err){
            resp.status(500);
            resp.end();
            console.error('Caught error', err);
        };
    }
});

router.get('/order', async(req, resp, next)=>{
    console.log(req.query);
    const orderId = req.query.orderId;
    try{
        await axios.get(key.checkout_baseurl+'/api/admin/o/order', {params:{'orderId':req.query.orderId}}).then(response=>{
            console.log(response.data)
            return resp.status(200).json({'order':omsService.mapOrder2Resposne(response.data)})
        }).catch(err=>{
            console.log(err)
            return resp.status(404).json({msg:'No Order found.'})
        });
    }catch(err){
        resp.status(500);
        resp.end();
        console.error('Caught error', err);
    };
});

router.get('/downloadOrders', async(req, res, next) => {

    console.log(req.query);
    const dateRange = req.query.range;
    var dates = dateRange.trim().split('-');
    if(dates.length ===2 
        && utils.isValidDate(dates[0].trim()) 
        && utils.isValidDate(dates[1].trim())){
        var minDate = new Date().addDays(-30).getTime()/1000;
        const stdate = utils.parseDate(dates[0].trim()).getTime()/1000;
        const eddate = utils.parseDate(dates[1].trim()).getTime()/1000;
        //Validate the input data.
        // if(minDate > stdate){
        //     return resp.status(404).json({msg:'Start date should with in 30 days from Today.'})
        // } else if(2505600 < (eddate-stdate)) {
        //     return resp.status(404).json({msg:'Period should be with in 30 days.'})
        // } else if(eddate < stdate){
        //     return resp.status(404).json({msg:'End Date should be after Start Date'})
        // }
        try{
            await axios.get(key.checkout_baseurl+'/api/admin/o/orders?stdate='+stdate+'&eddate='+eddate).then(async response=>{

                var workbook = await omsService.downloadOrders(response.data);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader("Content-Disposition", "attachment; filename=" + "Orders.xlsx");
                workbook.xlsx.write(res)
                    .then(function (data) {
                        res.end();
                        console.log('Orders File write done........');
                    });
            }).catch(err=>{
                console.log(err)
                return resp.status(404).json({msg:'No Orders found for time'})
            });
        }catch(err){
            resp.status(500);
            resp.end();
            console.error('Caught error', err);
        };
    }
    
 })

module.exports = router;
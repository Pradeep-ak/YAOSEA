'use strict';

const express = require('express')
const cartService = require('../service/cartService')
const checkoutService = require('../service/checkoutService')
const Razorpay = require('razorpay')
const config = require('../config/keys')
let middleware = require('../utils/middleware');
const https = require('https');
const utils = require('../utils/utils')

//Paytm Related imports
var paytm_config = require('../utils/paytm/paytm_config').paytm_config;
var PaytmChecksum = require("../utils/paytm/PaytmChecksum");

const router = express.Router();

const instance = new Razorpay({
    key_id: config.RazorpayKey,
    key_secret: config.RazaorpaySecertKey
  });

router.get('/rzp_capture/:payment_id/:amount', middleware.verifySignToken , async (req, res) => {
    try{
        console.log('Payment Capture for Acc :' + req.decoded.sub +', with payment Id : '+req.params.payment_id)
        const payment_id= req.params.payment_id;
        const amount = Number(req.params.amount*100);
        var order = await cartService.getCart(req.decoded.sub, req.query.storeid);
        instance.payments.capture(payment_id, amount).then((data) => {
            checkoutService.updatePaymentDetailsInfo(order, data, payment_id, amount)
            cartService.saveCart(order)
            res.status(200).json('OK');
        }).catch((error) => {
        console.error(error)
        res.status(422).message('Payment was not completed due to Error in system.')
        });
    } catch(err){
        console.error('Error in payment capture : ' + req.decoded.sub +' with payment ID : '+req.params.payment_id)
        res.status(500).json({msg: err.message});
    }
  });

  router.post('/generate_checksum', middleware.checkToken ,async (req, res) =>{
    try{
        
        var order = await cartService.getCart(req.decoded.sub, req.query.storeid);
            /* initialize an object with request parameters */
        var paytmParams = {
            /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
            "MID" : paytm_config.MID,

            /* Find your WEBSITE in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
            "WEBSITE" : "DEFAULT",

            /* Find your INDUSTRY_TYPE_ID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
            "INDUSTRY_TYPE_ID" : "Retail",

            /* Enter your unique order id */
            "ORDER_ID" : order.Order_id+'_'+Date.now(),

            /* unique id that belongs to your customer */
            "CUST_ID" : order.Acc_id,

            /* customer's mobile number */
            "MOBILE_NO" : order.PersonalInfo.phoneNumber,

            /* customer's email */
            "EMAIL" : order.PersonalInfo.email,
            
            /**
            * Amount in INR that is payble by customer
            * this should be numeric with optionally having two decimal points
            */
            
            "TXN_AMOUNT" : order.PriceInfo.orderTotal,
            // "TXN_AMOUNT" : "1",

            /* on completion of transaction, we will send you the response on this URL */
            "CALLBACK_URL" : config.site_baseurl+"/api/o/pay/verify_checksum"
        };
        var userAgent= req.headers['user-agent'];
        console.log(req.headers.host)
        if(userAgent && userAgent.toLowerCase().includes("mobile")){
            paytmParams['CHANNEL_ID'] = "WAP"
        }else{
            /* WEB for website and WAP for Mobile-websites or App */
            paytmParams['CHANNEL_ID'] = "WEB"

        }

        /**
        * Generate checksum by parameters we have
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, paytm_config.MERCHANT_KEY);
        paytmChecksum.then(function(result){
        console.log("generateSignature Returns:" + result);
        res.writeHead(200, {'Content-type' : 'text/json','Cache-Control': 'no-cache'});
        paytmParams['CHECKSUMHASH']=result;
        res.write(JSON.stringify(paytmParams));
        res.end();

    }).catch(function(error){
        console.log(error);
    });

    } catch(err){
        console.error(err)
        res.status(500).json({msg: err.message});
    }
  });

  router.post('/verify_checksum', async (req, res) =>{
    try{
        console.log(req.body)
        // get received checksum
        var checksum = req.body.CHECKSUMHASH;

        // remove this from body, will be passed to function as separate argument
        delete req.body.CHECKSUMHASH;
        
        if(PaytmChecksum.verifySignature(req.body, paytm_config.MERCHANT_KEY, checksum)) {
            console.log("Checksum Verification => true");
            
            // if checksum is validated Kindly verify the amount and status 
            // if transaction is successful 
            // kindly call Paytm Transaction Status API and verify the transaction amount and status.
            // If everything is fine then mark that transaction as successful into your DB.
            var paytmParams = {};
            paytmParams["MID"]     = paytm_config.MID;
            paytmParams["ORDERID"] = req.body.ORDERID;

            PaytmChecksum.generateSignature(paytmParams, paytm_config.MERCHANT_KEY).then(function(checksum){
                console.log('Generated checksum for transaction verification.')
                paytmParams["CHECKSUMHASH"] = checksum;
            
                var post_data = JSON.stringify(paytmParams);
            
                var options = {
                    /* for Staging */
                    //hostname: 'securegw-stage.paytm.in',
                    /* for Production */
                    hostname: 'securegw.paytm.in',
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };
                var data=''
                var response = "";
                var post_req = https.request(options, function(post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });
                    post_res.on('end', async function () {
                        console.log('Response: ', response);
                        data=JSON. parse(response);
                        console.log(data.STATUS)
                        if(data.STATUS === 'TXN_SUCCESS'){
                            var orderRepo = await cartService.getOrder(req.body.ORDERID.split('_')[0], req.query.storeid);
                            await checkoutService.updatePaymentDetailsInfo(orderRepo, data, data.TXNID, data.TXNAMOUNT)
                            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                            await checkoutService.submitOrder(orderRepo, req.headers['user-agent'], ip);
                            await cartService.saveCart(orderRepo)
                            checkoutService.sendNotification(orderRepo)
                            var redirecturl = '/cart'
                            return res.redirect('/oc?orderId='+req.body.ORDERID.split('_')[0])                    
                        }else{
                            var orderRepo = await cartService.getOrder(req.body.ORDERID.split('_')[0], req.query.storeid);
                            await checkoutService.updatePaymentDetailsInfo(orderRepo, data, '', 0)
                            await cartService.saveCart(orderRepo)
                            return res.redirect('/review') 
                        }
                    });
                });
                post_req.write(post_data);
                post_req.end();
            }).catch(err=>{
                console.log("Transaction verification failed.");
                return res.redirect('/review') 
            }); 
        }else{
            console.log("Checksum Verification => false");
            return res.redirect('/review') 
        }            
    } catch(err){
        console.error('Error in payment capture with payment ID')
        res.status(500).json({msg: err.message});
    }
  });

  module.exports = router
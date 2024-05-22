const express = require('express');
const utils = require('../utils/utils')
const key = require('../config/keys')
const axios = require('axios');
const Product = require('../models/ProductModel')
let middleware = require('../utils/middleware');

const router = express.Router();

router.post('/republish/:storeid', async(req, res)=>{
    try{
            if(req.params.storeid=='all'){
                var products = await Product.find({})
            }else{
                var products = await Product.find({storeid:parseInt(req.params.storeid)})
            }
            if(!products){
                return res.status(404).json({'err':'Products not found.'})
            }
            products.forEach(async prod=>{
                await axios.post(key.catalog_baseurl+'/api/admin/product', prod.toJSON()).then(response=>{})
            })
    }catch(err){
        console.log(err)
        res.status(500).json({'err':'Oop..!! Error while publishing to site.'});
        res.end();
        console.error('Caught error', err);
    }   
})

router.post('/reindex/:storeid', async(req, res)=>{
    await axios.get(key.catalog_baseurl+'/api/admin/reindex/'+req.params.storeid).then(response=>{
        return res.status(response.status).json(response.data)
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({'err':'Oop..!! Error while publishing to site.'})
    });
})

module.exports=router;
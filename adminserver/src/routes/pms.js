const express = require('express');
const utils = require('../utils/utils')
const key = require('../config/keys')
const axios = require('axios');
const Product = require('../models/ProductModel')
let middleware = require('../utils/middleware');
const PMSService = require('../service/pmsService')

const router = express.Router();

router.post('/create', 
            middleware.upload.single('productImage'), 
            // middleware.uploadImages, 
            middleware.resizeImages, 
            async (req, res, next)=>{
    try{
        var product = await Product.create({
            name: req.body.name,
            keywords: req.body.keywords,
            desc : req.body.desc,
            brand : req.body.brand,
            price : parseInt(req.body.price),
            categories : req.body.categories,
            status: req.body.status,
            image: req.body.image,
            storeid:req.query.storeid
        });
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({'err':'Oops..!! Something went wrong.'});
        console.error(err)
    }
});

router.put('/update/:id', 
            middleware.upload.single('productImage'), 
            // middleware.uploadImages, 
            middleware.resizeImages, 
            async (req, res, next)=>{
    try{
        var productData = {
            name: req.body.name,
            keywords: req.body.keywords,
            desc : req.body.desc,
            brand : req.body.brand,
            price : parseInt(req.body.price),
            categories : req.body.categories,
            status: req.body.status,
            storeid:req.query.storeid
        }
        if(req.body.image){
            productData['image']=req.body.image
        }
        var product = await Product.findOneAndUpdate({'Id':parseInt(req.params.id)}, productData, {new: true});
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({'err':'Oops..!! Something went wrong.'});
        console.error(err)
    }
});


router.get('/search', async (req, res, next)=>{
    try{
        var searchTerm = req.query.searchTerm;
        console.log(searchTerm)
        res.status(200).json( await PMSService.searchProduct(req.query.searchTerm, req.query.storeid))      
    }catch(err){
        res.status(500).json({'err':'Oops..!! Something went wrong.'});
        console.error(err)
    }
});

router.post('/publish', async (req, res)=>{
    console.log(req.body.id)
    try{
        var product = await Product.findOne({'Id': parseInt(req.body.id)})
        if(!product){
            return res.status(404).json({'err':'Product not found.'})
        }
        
        await axios.post(key.catalog_baseurl+'/api/admin/product', product.toJSON()).then(response=>{
            return res.status(200).json({'msg':response.data.msg})
        }).catch(err=>{
            console.log(err)
            return res.status(500).json({'err':'Oop..!! Error while publishing to site.'})
        });
    }catch(err){
        console.log(err)
        res.status(500).json({'err':'Oop..!! Error while publishing to site.'});
        res.end();
        console.error('Caught error', err);
    }
});

router.get('/site/product/:id', async(req, res)=>{
    await axios.get(key.catalog_baseurl+'/api/admin/product/'+req.params.id).then(response=>{
        return res.status(response.status).json(response.data)
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({'err':'Oop..!! Error while publishing to site.'})
    });
})

router.get('/republish/:store', async(req, res)=>{
    await axios.get(key.catalog_baseurl+'/api/admin/product/'+req.params.id).then(response=>{
        return res.status(response.status).json(response.data)
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({'err':'Oop..!! Error while publishing to site.'})
    });
})


router.get('/download/:searchTerm', async(req, res, next) => {
    var workbook = await PMSService.downloadProduct(req.params.searchTerm, req.query.storeid);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    workbook.xlsx.write(res)
        .then(function (data) {
            res.end();
            console.log('File write done........');
        });
 })

module.exports=router;

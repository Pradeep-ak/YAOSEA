const express = require('express');
const Product = require('../../models/product');
const client = require('../../config/solrClient');

const router = express.Router();

router.get('/test',(req, res)=>res.json({msg:'Hello Test Api Working..!!!!'}))

router.post('/product',async (req, res)=>{
    console.log(req.body)
    try{        
        var id=req.body.Id
        await Product.findOneAndUpdate({'Id':parseInt(id)}, req.body, {new:true, upsert:true, setDefaultsOnInsert:true});

        req.body.id=id
        delete req.body.Id
        await client.update(req.body)
        client.commit()
        
        res.status(200).json({'msg' : 'Product ' + id + ' is updated.'})
        
    }catch(err){
        console.log(err)
        res.status(500).json({msg : 'Internal Sever Error'})
        console.error(err)
    }
});

router.get('/product/:id',async (req, res)=>{
    try{        
        var product = await Product.findOne({'Id':parseInt(req.params.id)});
        if(product){
            var productJson = product.toJSON()
            delete productJson._id
            delete productJson.__v
            res.status(200).json(productJson) 
        }else{
            res.status(404).json({msg:'Product Not found'}) 
        }
    }catch(err){
        console.log(err)
        res.status(500).json({msg : 'Internal Sever Error'})
        console.error(err)
    }
});

router.get('/reindex/:storeid', async(req, res)=>{
    try{
        if(req.params.storeid=='all'){
            var products = await Product.find({})
        }else{
            var products = await Product.find({'storeid':parseInt(req.params.storeid)})
        }
        if(!products){
            return res.status(404).json({'err':'Products not found.'})
        }
        console.log(products)
        products.forEach(async prod=>{
            if(prod){
                var productJson = prod.toJSON()
                productJson.id=productJson.Id
                delete productJson.Id
                delete productJson._id
                delete productJson.__v
                await client.update(productJson,{commit:false})
            }
        });
        client.commit()
        res.status(200).json({'msg':'OK'}) 
    }catch(err){
        console.log(err)
        res.status(500).json({'err':'Oop..!! Error while publishing to site.'});
        res.end();
        console.error('Caught error', err);
    } 
})

module.exports = router;

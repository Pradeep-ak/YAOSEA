const express = require('express');
const Category = require('../../models/category');
const client = require('../../config/solrClient')
const Utils = require('../../utils')
const department = require('../../config/menu.json')

const router = express.Router();

router.get('/:seoName', async (req, res)=>{
    try{
        var deptLef = department.menu.filter(function(o){
            return (o.seoname === req.params.seoName);
        });
        if(!deptLef[0]){
            return res.status(404).json('Category not found.')
        }
        console.log(deptLef[0].id)
        currentPage = 1;
        currentPage = req.query.pg === undefined ? currentPage:parseInt(req.query.pg);
        req.query.id=deptLef[0].id
        req.query.status='active';
        
        console.log(new Utils().getQuery(req.query))

        var query = client.query().q(new Utils().getQuery(req.query))
        .start((currentPage-1)*24).rows(24);

        ProductCount = 0;
        products = []
        try {
            const result = await client.search(query);
            //console.log('Response:', result);
            ProductCount = result.response.numFound;
            products = result.response.docs.map((e,i) => {
                //console.log('Response:', e);
                var IsPirce = false
                var Maxprice = 'Click to check price'
                if(e.price != null){
                    IsPirce = true
                    Maxprice = e.price[0];
                    Marketinglabel = '';
                }
                return {
                    index:i,
                    id:e.id,
                    Name:e.name[0].replace('_'+e.id,''),
                    PrimImg:{
                        link:'/prdimg/'+e.image[0],
                        alttxt:e.name[0].replace('_'+e.id,'')
                    },
                    skuImg:[],
                    IsPirce: IsPirce,
                    Maxprice:Maxprice,
                    Minprice:Maxprice,
                    Marketinglabel:Marketinglabel,
                    productLink:'/p/'+new Utils().convertToSlug(e.name[0].replace('_'+e.id,''))+'?id='+e.id
                }
            });

            // Pagination Section
            paginationInfo={
                previousPage: new Utils().previousPage(currentPage),
                previousPageUrl: new Utils().previousPageUrl(currentPage, '/c/'+req.params.seoName, req.query),
                currentPage:currentPage,
                nextPage: new Utils().nextPage(currentPage, ProductCount, 24),
                nextPageUrl:  new Utils().nextPageUrl(currentPage, ProductCount, 24, '/c/'+req.params.seoName, req.query),
                TotalPage: new Utils().totalPage(currentPage, ProductCount, 24)
            }
            //console.log(dim)
         } catch(e) {
            console.error(e);
        }

        var response = {
            CategoryName:deptLef[0].name,
            ProductCount:ProductCount,
            Products:products,
            paginationInfo:paginationInfo
        }
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({mess:err.message})
    }
});

// router.get('/',(req, res) => res.json());

module.exports=router;
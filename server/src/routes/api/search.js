const express = require('express');
const client = require('../../config/solrClient')
const Utils = require('../../utils')

const router = express.Router();

router.get('/:seoName', async (req, res)=>{
    var app = req.app; // get app object
    req.query.status='active';
    
    currentPage = 1;
    try{
        console.log('Search Term : ' + req.query.searchTerm);

        searchTerm = req.query.searchTerm.trim();
        
        //res.status(200).json(req.query.s)
        var param = [];
        currentPage = req.query.pg === undefined ? currentPage:parseInt(req.query.pg);

        //Add field against which search is performed in edismax query
        param.pushArray(new Utils().getQf(['desc^0.5', 'name^4','keywords^1', 'id^3']));
        
        mm = (searchTerm.split(" ").length-1)===0?1:searchTerm.split(" ").length-1;
        //Add MM to the edismax query
        param.pushArray(new Utils().getMM(mm));
        //param.pushArray(new Utils().getMM(2));

        //Add the fiter value.
        param.pushArray(new Utils().getFq(req.query));

        BoostDimVal = app.get('solr_dim_set');
        boostArr = new Utils().getBoostQuery(searchTerm, BoostDimVal);

        console.log('boostQ = ' + (boostArr.value && boostArr.value.length > 0))
        if(boostArr.value && boostArr.value.length > 0){
            param.pushArray([boostArr]);
            param.pushArray([{'field' : 'sort', 'value' :'score desc'}]);
        } else {
            //Add the Sort value based in search terms found count in Name Fields.
            param.pushArray(new Utils().getSort(searchTerm));
        }
        
        //Run the query in the solr indexing.
        var query = client.query().q(searchTerm)
        .edismax()
        .addParams(param)
        .start((currentPage-1)*24).rows(24)
        .facetQuery({
            on: true,
            field:['brand']
        });
        
        ProductCount = 0;
        products = []
        try {
            const result = await client.search(query);
            //console.log('Response:', result);

            //Handle Single results.
            ProductCount = result.response.numFound;
            // if(ProductCount===1){
            //     var id = result.response.docs[0].id
            //     var name = result.response.docs[0].name[0]
            //     var redirecturl = '/p/'+new Utils().convertToSlug(name.replace('_'+id,''))+'?id='+id
            //     res.status(200).json({"REDIRECT_URL":redirecturl})
            //     return;
            // }

            //Product Sections
            products = result.response.docs.map((e,i) => {
                // console.log('Response:', e);
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

            // Dimension Section
            keys = Object.keys(result.facet_counts.facet_fields);
            dim =[]
            for (let index = 0, k=0; index < Object.keys(result.facet_counts.facet_fields).length; index++) {
                dimName = Object.keys(result.facet_counts.facet_fields)[index];
                dimVal = []
                //console.log(result.facet_counts.facet_fields['brand'])
                dimArr = result.facet_counts.facet_fields[dimName];
                for (let j = 0, i=0; j < dimArr.length; j++) {
                    if(dimArr[j+1] > 0){
                        var selected = new Utils().isSelected(req.query, dimName, dimArr[j])
                        url = '#'
                        if(selected){
                            url = new Utils().removeParamToQuery('/s/'+req.params.seoName, req.query, dimName, dimArr[j])
                        } else {
                            url = new Utils().addParamToQuery('/s/'+req.params.seoName, req.query, dimName, dimArr[j])
                        }
                        dimVal[i]={ 
                            label:dimArr[j].split("_").join(' ').trim().toLowerCase(),
                            selected:selected,
                            count:dimArr[j+1],
                            url: url
                        }
                        i++;
                    }
                    j++;   
                }
                if(dimVal.length == 0){
                    continue
                }
                // Sort the Dim Value in with label name
                // dimVal.sort((a, b) => a.label.localeCompare(b.label));
                
                dim[k]={
                    'index':k,
                    'dimName':dimName.replace('_', ' ').toLowerCase(),
                    'dimVal':dimVal
                } 
                k++;               
            }

            // Pagination Section
            paginationInfo={
                previousPage: new Utils().previousPage(currentPage),
                previousPageUrl: new Utils().previousPageUrl(currentPage, '/s/'+req.params.seoName, req.query),
                currentPage:currentPage,
                nextPage: new Utils().nextPage(currentPage, ProductCount, 24),
                nextPageUrl:  new Utils().nextPageUrl(currentPage, ProductCount, 24, '/s/'+req.params.seoName, req.query),
                TotalPage: new Utils().totalPage(currentPage, ProductCount, 24)
            }
            var selectedDim = []
            if(result.responseHeader.params.fq){
                if(result.responseHeader.params.fq instanceof Array){
                    var selectedDim=result.responseHeader.params.fq.filter(y=>
                        y.split(':')[0].trim()!='status' && y.split(':')[0].trim()!='storeid' 
                    ).map(e=>{
                        _dim = e.split(':');
                        return {
                            dimName: Utils.Capitalize(_dim[0].split("_").join(' ').trim()),
                            dimVal:_dim[1].split("_").join(' ').trim(),
                            removeURL:new Utils().removeParamToQuery('/s/'+req.params.seoName, req.query, _dim[0], _dim[1])
                        }
                    })
                } else{
                    _dim = result.responseHeader.params.fq.split(':');                    
                    if(_dim[0].trim()!='status' && _dim[0].trim()!='storeid'){
                        var selectedDim = [{
                            dimName: Utils.Capitalize(_dim[0].split("_").join(' ').trim()),
                            dimVal:_dim[1].split("_").join(' ').trim(),
                            removeURL:new Utils().removeParamToQuery('/s/'+req.params.seoName, req.query, _dim[0], _dim[1])
                        }]
                    }                    
                }
            }

            //console.log(dim)
         } catch(e) {
            console.error(e);
        }

        var response = {
            sort:'Featured',
            sortOption:[
                'Featured',
                // 'Arrivals',
                // 'Best Sellers',
                'Price L-H',
                'Price H-L',
                // 'Rating H-L'
            ],
            SearchTerm:req.query.searchTerm,
            ProductCount:ProductCount,
            Products:products,
            Dim:dim,
            paginationInfo:paginationInfo,
            selectedDim:selectedDim
        }
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({mess:err.message})
    }
});

// router.get('/',(req, res) => res.json());

    
module.exports=router;
const Product = require('../models/ProductModel')
const Excel = require('exceljs')

_searchProduct = async(searchTerm, storeid) => {
    var results = []
    if(searchTerm && searchTerm.match('^[0-9]+$')){
        console.log('Search the product ID : ' + searchTerm)
        result = await Product.findOne({$and:[{'storeid':storeid}, {'Id': parseInt(searchTerm)}]})
        if(result){
            results=[result]
        }
    } else if(searchTerm) {
        console.log('Search the term : ' + searchTerm + ", storeId : " + storeid)
        results = await Product.find().and([{'storeid':storeid}, {$or:[
            {'name': {$regex : ".*"+searchTerm+".*", '$options' : 'i'}},
            {'keywords':{$regex : ".*"+searchTerm+".*", '$options' : 'i'}},
            {'desc':{$regex : ".*"+searchTerm+".*", '$options' : 'i'}},
            {'brand':{'$regex' : '^'+searchTerm+'$', '$options' : 'i'}},
            {'status':{'$regex' : '^'+searchTerm+'$', '$options' : 'i'}}
        ]}])
    }
    return results.map( e => {
        var obj = e.toJSON()
        delete obj.storeid; 
        return obj;
    });
}

_downloadProduct = async(searchTerm, storeid) => {
    var searchresults = await _searchProduct(searchTerm, storeid);
    var workbook = new Excel.Workbook();

    workbook.creator = 'Localshop Application';
    workbook.lastModifiedBy = 'Localshop Application';
    workbook.created = new Date(1985, 3, 22);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(1985, 3, 22);
    workbook.properties.date1904 = true;

    workbook.views = [
        {
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ];
    var worksheet = workbook.addWorksheet(searchTerm);
    worksheet.columns = [
        { header: 'S.No', key: 'id', width: 10, style:{font:{bold:true}}},
        { header: 'Name', key: 'name', width: 32 },
        { header: 'Description', key: 'desc', width: 50},
        { header: 'Brand', key: 'brand', width: 30},
        { header: 'Keywords', key: 'keywords', width: 50},
        { header: 'Price', key: 'price', width: 10, type: 'integer'},
        { header: 'Status', key: 'status', width: 30},
    ];
    count = 1;
    searchresults.forEach(ele => {

        worksheet.addRow({ 
            id: count, 
            name: ele.name, 
            desc:ele.desc,  
            brand:ele.brand, 
            keywords:ele.keywords, 
            price:ele.price, 
            status:ele.status});

        count = count+1;
    });
    return workbook;
}

module.exports={
    downloadProduct:_downloadProduct,
    searchProduct:_searchProduct
}
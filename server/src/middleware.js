const storeInfo = require('./config/storeInfo');

let updateStore = (req, res, next) => {
    var local = req.headers.host
    var storenum = storeInfo.filter(e=>{
      return e.host.contains(local)
    });
    console.log(storenum)
    if(storenum && storenum.length > 0 && storenum[0].StoreNumber){
      req.query.storeid = parseInt(storenum[0].StoreNumber);
    }else{
      req.query.storeid = 0000;
    }  
    next();
  }

module.exports = {
    updateStore: updateStore
}
let jwt = require('jsonwebtoken');
const config = require('../config/keys');
const storeInfo = require('../config/storeInfo');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.JWTSecertKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

let verifySignToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {    
    jwt.verify(token, config.JWTSecertKey, {ignoreExpiration:true} ,(err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

let updateStore = (req, res, next) => {
    var local = req.headers.host
    var storenum = storeInfo.filter(e=>{
      return e.host.contains(local)
    });
    if(storenum && storenum.length > 0 && storenum[0].StoreNumber){
      req.query.storeid = parseInt(storenum[0].StoreNumber);
    }else{
      req.query.storeid = 0000;
    }  
    next();
  }

module.exports = {
  checkToken: checkToken,
  verifySignToken:  verifySignToken,
  updateStore: updateStore
}
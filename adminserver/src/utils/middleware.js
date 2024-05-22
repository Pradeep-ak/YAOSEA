let jwt = require('jsonwebtoken');
const config = require('../config/keys');
const storeInfo = require('../config/storeInfo');

/** 
 * Validate the JWT for admin server. 
*/
let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.JWTSecertKey, (err, decoded) => {
      if (err || decoded.sub.length === 0 || !(decoded.Role === 'R0')) {
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

const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

//const uploadFiles = upload.array("images", 10);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }
    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!req.files && !req.file) {
    console.log('No image file found')
    return next();
  }

  if (req.file) {
    console.log('images file found')
    const filename = req.file.originalname.replace(/\..+$/, "");
    const uniqueSuffix = new Date().getTime() + '-' + Math.round(Math.random() * 1E9)
    const newFilename = `prd-${uniqueSuffix}.jpeg`;

    await sharp(req.file.buffer)
      .resize(640, 640, {
        kernel: sharp.kernel.nearest,
        fit:"inside"
        })
      .toFormat("jpeg")
      // .jpeg({ quality: 90 })
      .toFile(`/usr/src/app/public/prdimg/${newFilename}`);

    req.body.image = newFilename;
    return next();
  }

  console.log('images files found')
  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const filename = file.originalname.replace(/\..+$/, "");
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const newFilename = `.prd-${uniqueSuffix}.jpeg`;

      await sharp(file.buffer)
        .resize(640, 640, {
          kernel: sharp.kernel.nearest,
          fit:"inside"
          })
        .toFormat("jpeg")
        // .jpeg({ quality: 90 })
        .toFile(`/usr/src/app/public/prdimg/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};


module.exports = {
  checkToken: checkToken,
  uploadImages: uploadImages,
  upload:upload,
  resizeImages: resizeImages,
  updateStore: updateStore
}
const express = require('express');
let jwt = require('jsonwebtoken');
const config = require('../config/keys');
const UserModel = require('../models/UserModel');


const router = express.Router();

router.post('/login', async(req, resp, next)=>{
    try {
        let item = await UserModel.findOne({'username': req.body.username});
        if(item && item.toJSON().password === req.body.password){
            var user = {Role:'R0'};
            var token = jwt.sign(user, config.JWTSecertKey, {expiresIn:config.accessExpireTime, issuer:'ecom-admin', subject:item.toJSON().accountId})
            return resp.json({name:item.toJSON().name, token:token});
        }
        return resp.status(404).json({err:'Invalid username and password.'});
    } catch (err) {
        console.error(err);
        resp.status(500);
        resp.end();
    }  
});

router.post('/logout', async(req, resp, next)=>{
    try {
        var user = {Role:'R1'};
        var token = jwt.sign(user, config.JWTSecertKey, {expiresIn:config.accessExpireTime, issuer:'ecom-admin', subject:''})
        return resp.status(200).json({token:token});
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error('Caught error', err);
    }   
});

router.post('/create', async(req, resp, next)=>{
    try {
        // console.log(req.body)
        const user = await UserModel.create(req.body
        //     {
        //     "accountId":req.body.accountId,
        //     "username":req.body.username,
        //     "password":req.body.password,
        //     "name":req.body.name,
        //     "email":req.body.email,
        //     "phone":req.body.phone
        // }
        );
        resp.status(200).json(user);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error('Caught error', err);
    }   
});

module.exports = router;
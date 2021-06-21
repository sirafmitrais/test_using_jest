var express = require('express')
var router = express.Router()

// middleware to record all request specific to this router
router.use(function logging(req, res, next){
    console.log('----------------------------------');
    console.log('Time: ', Date.now());
    console.log('Path_Url: ', req.originalUrl);
    console.log('Method_Request: ', req.method);
    console.log('----------------------------------');
    next()
})

// 

router.route('/:user_id')
    .all(function validation(req, res, next){
        // DoValidation
        next()
    })
    .get(function (req, res, next){
        // doSomething
        next()
    })
    .post(function (req, res, next){
        // doSomething
        next()
    })
    .delete(function (req, res){
        // doSomething
    })
var express = require('express')
var peopleRouter = express.Router()

// middleware to record all request specific to this router
peopleRouter.use(function logging(req, res, next){
    console.log('----------------------------------');
    console.log('Time: ', Date.now());
    console.log('Path_Url: ', req.originalUrl);
    console.log('Method_Request: ', req.method);
    console.log('----------------------------------');
    next()
})


peopleRouter.get('/', function (req, res){
    res.status(200).send(
        {
            message: 'Get all peoples'
        }
    )
})

peopleRouter.post('/', function (req, res, next) {
    // ValidatePostReq
    next()
}, function logic(req, res) {
    // process the data
}
)

peopleRouter.get('/:id', function (req, res){
    message_send = `Get people detail id:  ${req.params}`
    res.status(200).send(
        {
            message: message_send
        }
    )
})



peopleRouter.delete(':/id', function (err, req, res, next){
    if (err == null) {
        res.status(201).send({
            message: 'Succcesfully delete the data'
        })
    } else {
        res.status(500).send(
            {
                message: err
            }
        )
    }
})


peopleRouter.get('/search', function (req, res){
    res.send({
        message: 'search something'
    })
})


module.exports = peopleRouter
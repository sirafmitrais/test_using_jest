const express = require('express')
const peopleRouter = express.Router()


// Import from dataHandler
var dataHandler = require('./dataHandler.js')

// middleware to record all request specific to this router
peopleRouter.use(function logging(req, res, next){
    console.log('----------------------------------');
    console.log('Time: ', Date.now());
    console.log('Path_Url: ', req.originalUrl);
    console.log('Method_Request: ', req.method);
    console.log('----------------------------------');
    next()
})


peopleRouter.get('/search', function (req, res) {
    console.log(req.query.q)
    dataHandler.getDetailByQuery(req.query.q)
        .then(
            result => {
                res.status(200).send(result)
            }
        )
        .catch(err => {
            res.status(404).send(err)
        })
})


var getAll = function getAll(req, res){    
    dataHandler.readAllData()
    .then( result => {
        // console.log(e);
        res.status(200).send(result)
    } ).catch(err =>{
        res.status(500).send(err)
    });
}

peopleRouter.get('/', getAll)



var createData = function createData(req, res, next){
    data_input = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        address: req.body.address,
    }
    dataHandler.createData(data_input)
        .then(result => {
            console.log(result)
            res.status(200).send(data_input)
        });
}

peopleRouter.post('/', createData)

var getDetailById = function getDetailById(req, res) {
    // message_send = `Get people detail id:  ${req.params.id}`
    dataHandler.getDetailById(req.params.id)
        .then(
            result => {
                if (result.err == true) {
                    res.status(404).send(result)
                }
                else {
                    res.status(200).send(result)
                }
                // console.log(result)
            }
        )
        .catch(err => {
            res.status(500).send(err)
        })
}

peopleRouter.get('/:id', getDetailById)


peopleRouter.delete('/:id', function (req, res){
    dataHandler.deleteById(req.params.id)
        .then(
            result => {
                console.log(result)
                res.status(200).send(result)
            }
        )
        .catch(err => {
            res.status(500).send(err)
        })
})




module.exports = peopleRouter
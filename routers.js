const express = require('express')
const peopleRouter = express.Router()


// Import from dataHandler
var handler = require('./handler')
// middleware to record all request specific to this router
peopleRouter.use(function logging(req, res, next){
    console.log('----------------------------------');
    console.log('Time: ', Date.now());
    console.log('Path_Url: ', req.originalUrl);
    console.log('Method_Request: ', req.method);
    console.log('----------------------------------');
    next()
})

peopleRouter.get('/search', handler.getDetailbySearch)
peopleRouter.get('/', handler.getAll)
peopleRouter.post('/', handler.createData)
peopleRouter.get('/:id', handler.getDetailById)
peopleRouter.delete('/:id', handler.deleteByIdUser)


module.exports = peopleRouter
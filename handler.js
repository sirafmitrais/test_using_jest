var dataHandler = require('./dataHandler.js')


var getDetailbySearch = function (req, res) {
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
}

var getAll = function getAll(req, res) {
    dataHandler.readAllData()
        .then(result => {
            // console.log(e);
            res.status(200).send(result)
        }).catch(err => {
            res.status(500).send(err)
        });
}

var createData = function createData(req, res, next) {
    data_input = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        adress: req.body.adress,
    }
    dataHandler.createData(data_input)
        .then(result => {
            console.log(result)
            res.status(200).send(data_input)
        });
}

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

var deleteByIdUser = function (req, res) {
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
}

module.exports = {
    getDetailbySearch: getDetailbySearch,
    getAll: getAll,
    createData: createData,
    getDetailById: getDetailById,
    deleteByIdUser: deleteByIdUser
}
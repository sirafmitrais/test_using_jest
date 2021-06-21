const express = require('express')
const app = express()
const port = 3000

// import router
const peopleRouter = require('./routers')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/peoples', peopleRouter)

app.get('/', function (req, res){
    res.send(
        "Good Morning"
    )
})

app.use('*', function (req, res) {
    res.status(404).send({
        message: 'You Get Lost ? '
    })
})
app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`)
})  
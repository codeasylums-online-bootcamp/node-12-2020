const express = require('express')
const morgan = require('morgan')

const app = express()

const port = 3000

let count = 0

const logger = morgan('dev')

app.use(logger)

app.use('*',(req, res, next) => {
    count++
    next()
}) // * denotes everything , /==* , asdfghjk==* , 1234==*

app.get('/',(req, res) => {
    res.send("Hello World!")
})
//get, post, put, delete, patch

app.get('/abc',(req,res) => {
    res.send("Another")
})

app.get('/count',(req,res)=>{
    res.send(`Count is ${count}`)
})

app.use('*',(req,res,next)=>{
    res.send("Endpoint is not present 404")
    //send html file for 404
    // anything else
})

app.listen(port,() => {
    console.log(`Server running on ${port}`)
})

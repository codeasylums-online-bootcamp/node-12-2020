require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const parser = require('body-parser')

const userRoute = require('./routes/users')

const app = express()
const port = 3000

const {DB_NAME, DB_USER_NAME, DB_USER_PASSWORD} = process.env
mongoose.connect(`mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@codeasylums-nodejs.h2x8l.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true },(err)=>{
    if(err){
        console.log("DB Connection failed")
    }
    else{
        console.log("Atlas DB connection successful")
    }
})

const logger = morgan('dev')

app.use(logger)
app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

app.use('/user',userRoute) // /user/abc

app.use('*',(req,res,next)=>{
    res.send("Endpoint is not present 404").status(404)
})

app.listen(port,() => {
    console.log(`Server running on ${port}`)
})

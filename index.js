const express = require('express')
const morgan = require('morgan')

const userRoute = require('./routes/users')

const app = express()
const port = 3000


const logger = morgan('dev')

app.use(logger)

app.use('/user',userRoute)

app.use('*',(req,res,next)=>{
    res.send("Endpoint is not present 404").status(404)
})

app.listen(port,() => {
    console.log(`Server running on ${port}`)
})

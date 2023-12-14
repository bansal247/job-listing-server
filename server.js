const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//routes
app.get('/health',(req,res) => {
    res.status(200).json({
        service: 'job-listing-backend-server',
        status:'active',
        time: new Date()
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    mongoose.connect(process.env.MONGODB_URI)
    console.log(`server running at ${PORT}`)
})
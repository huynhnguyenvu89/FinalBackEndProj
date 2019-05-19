const express = require('express')

const app=express();



const morgan= require("morgan")
app.use(morgan('dev'))

const productRoute= require('./routes/product')
const projectRoute= require('./routes/project')
const userRoute = require('./routes/user')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const mongodb = require("mongodb")
const monk=require('monk')
var db=monk("localhost:27017/assignment3")
app.use(function(req,res,next){
    req.db = db;
    next();
})

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/project',projectRoute)

app.use((req,res,next)=>{
    const error= new Error("Not Found")
    error.status(404)
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(1111)
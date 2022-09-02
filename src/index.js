const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')
const route = require('./route/route')

const app = express();

app.use(bodyParser.json({extented:true}))
app.use(multer().any())
app.use('/',route)

const string = "mongodb+srv://WASIF321:Ansari738871@wasifdatabase.wdcjr.mongodb.net/IGT-pvtDB"

mongoose.connect(string)
.then(()=> console.log("mongoDB is connected"))
.catch((err)=>console.log(err))

const port = 8000;

app.listen(port,function(){
console.log('app is running at port'+port)
})
const express = require('express')
const app = express()
const dotenv = require('dotenv');
const user =  require('./routes/user')
const mongoose = require('mongoose')

dotenv.config({path : './config/dev.env'});


app.use(user)

//MongoDB Setup
mongoose.connect(process.env.DATABASE ,{useUnifiedTopology : true , useNewUrlParser : true,useCreateIndex: true})

const db = mongoose.connection

app.get('/',(req,res)=>{
    res.send("Hello World!!")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})


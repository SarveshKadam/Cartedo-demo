const express = require('express')
const app = express()
const dotenv = require('dotenv');
const user =  require('./routes/user')
const customer = require('./routes/customer')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config({path : './config/dev.env'});

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/auth',user)
app.use('/',customer)
//MongoDB Setup
mongoose.connect(process.env.DATABASE ,{useUnifiedTopology : true , useNewUrlParser : true,useCreateIndex: true})

const db = mongoose.connection



app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})


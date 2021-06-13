const express = require('express')

const router = express.Router()
const User = require('../api/models/user')
const auth = require('../api/middleware/auth')

router.get('/',auth,(req,res)=>{
    console.log();
    res.send(`Hello, ${req.user.name}!!`)
})

module.exports = router


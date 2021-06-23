const express = require('express')

const router = express.Router()
const User = require('../api/models/user')
const auth = require('../api/middleware/auth')

router.get('/',auth,(req,res)=>{
    res.send(req.user.name)
})

module.exports = router


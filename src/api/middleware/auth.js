const jwt = require('jsonwebtoken')
const User = require('../models/user')



const auth = async (req,res,next)=>{
   try {


        const token = req.cookies.token
        if(!token){
            return res.status(401).json({ errorMessage :"Please authenticate"})
        }
        const decoded = jwt.verify(token,'tryingtoken')
        
        const user = await User.findOne({_id : decoded.id})
        
        if(!user){
            return res.status(401).json({ errorMessage :"Please authenticate"})
        }
        
        req.token = token
        req.user = user
        next()
       
   } catch (error) {
       res.status(401).json({ errorMessage :"Please authenticate"})
   }
}

module.exports = auth
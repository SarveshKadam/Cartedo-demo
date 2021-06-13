const express = require('express')

const router = express.Router()
const User = require('../api/models/user')
const bcrypt = require('bcryptjs')


router.post('/', async (req, res) => {
    const { name, email, password } = req.body


    try {
        if (!name || !email || !password) {
            return res.status(400).json({ errorMessage: "Please enter all required fields" })
        }
        if (password.length < 6) {
            return res.status(400).json({ errorMessage: "Please a valid password of length greater than 6" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({ errorMessage: "User already exists" })
        }
        const user = new User({
            name, email, password
        })
        await user.save()
        const token = await user.generateAuthToken()
        // res.status(200).send(user)
        res.cookie("token", token, {
            httpOnly: true
        }).send()
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ errorMessage: "Please enter name and password" })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).send({ errorMessage: "Invalid credentials!" })
        }
        const isValid = await bcrypt.compare(password, existingUser.password)

        if (!isValid) {
            return res.status(400).send({ errorMessage: "Invalid credentials!" })
        }

        const token = await existingUser.generateAuthToken()
        res.cookie("token", token, {
            httpOnly: true
        }).send()

    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/logout', (req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires: new Date(0)
    }).send()
})

module.exports = router
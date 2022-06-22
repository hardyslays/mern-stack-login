const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = require('../../models/user.model')

// router.use((req,res,next) => {
//     console.log("Auth route")
//     next()
// })

router.get('/', (req, res) => {
    res.json({
        'msg':'auth'
    })
})



router.route('/register')
    .get((req,res) => {
        console.log("Get register")
        res.json({
            'msg':'register auth'
        })
    })
    .post( async (req, res) => {
        console.log("Post register\n",req.body)
        try{
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            res.json({
                "status" : "ok"
            })
        } catch (err) {
            res.json({
                "status" :"error",
                "msg": "Duplicate email ID"
            })
        }
    })



router.route('/login')  
    .get((req,res) => {
        console.log("Get login")
        res.json({
            'msg':'login auth'
        })
    })
    .post( async (req, res) => {
        console.log("Post login\n",req.body)

        const user = await User.findOne({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        if(user){
            res.json({
                'status': 'ok',
                'user':user
            })
        }
        else{
            res.json({
                'status' :'error',
                'msg':'No such user found'
            })
        }
    })



module.exports = router
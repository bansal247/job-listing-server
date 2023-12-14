const express = require('express')
const userRouter = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const errorHandler = require('../middleware/error')

userRouter.post('/register',async (req,res)=>{
    try{
        const {name,email,password,mobile} = await req.body

        //Checking fields
        if(!name || !email || !password || !mobile){
            return res.status(400).json({
                error:'All field are required'
            })
        }

        //Checking Existing User
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({
                error:'User already exists'
            })
        }

        //Hashing Password
        const encyptedPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:encyptedPassword,mobile})

        const jwtToken = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:12000})
        res.status(200).json({
            success:true,
            user:email,
            name:name,
            jwtToken
        })
    }
    catch(error){
        errorHandler(res,error)
    }
})

userRouter.post('/login',async (req,res)=>{
    try{
        const {email,password} = await req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(401).json({
                error:'Invalid email or password'
            })
        }
        correctPassword = await bcrypt.compare(password,user.password)
        if(!correctPassword){
            return res.status(401).json({
                error:'Invalid email or password'
            })
        }
        const jwtToken = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:12000})
        res.status(200).json({
            success:true,
            user:email,
            name:user.name,
            jwtToken
        })
        
    }
    catch(error){
        errorHandler(res,error)
    }
})

module.exports = userRouter
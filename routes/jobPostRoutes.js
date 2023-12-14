const express = require('express')
const jobPostRouter = express.Router();
const mongoose = require('mongoose')
const JobPost = require('../models/jobsModel')
const isLoggedIn = require('../middleware/checkLogin')
const errorHandler = require('../middleware/error')

jobPostRouter.use(isLoggedIn)


jobPostRouter.post('/create', async (req, res) => {
    try {
        const { 
            companyName,
            logoURL,
            postion,
            salary,
            jobType,
            remote,
            location,
            description,
            aboutCompany,
            skills,
            information
        } = await req.body

        if(
            !companyName || 
            !logoURL || 
            !postion || 
            !salary || 
            !jobType || 
            !remote || 
            !location || 
            !description || 
            !aboutCompany || 
            !skills || 
            !information
            ){
            return res.status(400).json({
                error:'All field are required'
            })
        }
        recruiterName = await req.userName
        userId = await req.userId

        await WeekList.create({
            companyName,
            logoURL,
            postion,
            salary,
            jobType,
            remote,
            location,
            description,
            aboutCompany,
            skills,
            information,
            recruiterName,
            userId
        })
        res.status(200).json({
            success:true,
        })
    }
    catch (error) {
        errorHandler(res,error)
    }
})


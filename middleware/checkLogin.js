const jwt = require('jsonwebtoken')
const errorHandler = require('./error')

const isLoggedIn = (req, res, next) => {
    try {
        const jwttoken = req.header('Authorization')
        if(!jwttoken){
            return res.status(401).json({message:'Unauthorized'})
        }
        const user = jwt.verify(jwttoken, process.env.JWT_SECRET)
        if (user) {
            req.userId = user._id
            req.userName = user.name
            next()
        }
        else {
            res.status(409).json({
                message: 'You are not logged In'
            })
        }
    }
    catch (err) {
        errorHandler(res,err)
    }

}
module.exports = isLoggedIn
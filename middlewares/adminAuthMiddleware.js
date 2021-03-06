const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')


const requireAuthAdmin = (req, res, next) => {
    const tokenData = req.cookies.token

    if (tokenData) {
        jwt.verify(tokenData,'jwtgizlikelime',(err,decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/adminlogin')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/adminlogin')
        next()
    }
}

const checkAdmin = (req,res,next) => {
    const tokenData = req.cookies.token

    if (tokenData) {
        jwt.verify(tokenData,'jwtgizlikelime', async (err,decodedToken) => {
            if (err) {
                res.locals.admin = null
            }else{
                let admin = await Admin.findById(decodedToken.id)
                res.locals.admin = admin
                next()
            }
        })
    }else{
        res.locals.admin = null
        next()
    }
}

module.exports = {
    requireAuthAdmin,
    checkAdmin
}
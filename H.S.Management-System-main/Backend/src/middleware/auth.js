const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {

        const token = req.body.token || req.header("Authorization").replace("Bearer ","");
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: 'No token, authorization denied'
            });
        }

        try {

            const decode = jwt.decode(token, process.env.JWT_SECRET);
            req.user = decode;


        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: 'Token Invalid'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ 
            success: false,
            message: 'Something went wrong while velidating the token' 
        });
    }
}

exports.isUser = async(req,res,next) => {
    try{

        if(req.user.role !== "User"){
            return res.status(401).json({
                success: false,
                msg: "This is the protected route for User only"
            })
        }

        next();

    }catch(error){
        return res.status(401).json({
            success: false,
            msg: "User role cannot be verified, please try again later"
        })
    }
}


exports.isHospital = async(req,res,next) => {
    try{

        if(req.user.role !== "Hospital_Admin"){
            return res.status(401).json({
                success: false,
                msg: "This is the protected route for Hospital Admin only"
            })
        }

        next();

    }catch(error){
        return res.status(401).json({
            success: false,
            msg: "User role cannot be verified, please try again later"
        })
    }
}
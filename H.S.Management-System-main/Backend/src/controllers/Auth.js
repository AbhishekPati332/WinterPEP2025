const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.signup =  async(req,res) => {
    try{

        const { name, email, password, role } = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                success: false,
                message: "all fields required"
            });
        }

        const findUser = await User.findOne({email: email});
        if(findUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });

        if(!createUser){
            return res.status(400).json({
                success: false,
                message: "Failed to create user"
            });
        }

        const payload = {
            email: createUser.email,
            role: createUser.role,
            id: createUser._id
        };

        const token = jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            token: token,
            role: role
        })


    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error signing up user"
        })
    }
}

exports.login = async(req,res) => {
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Email not Registered"
            });
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                role: user.role,
                id: user._id
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h'
            })
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                token: token,
                role: user.role
            })
        }

        return res.status(400).json({
            success: false,
            message: "Invalid password"
        })

         
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error logging in user"
        })
    }
}
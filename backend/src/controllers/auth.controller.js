import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sendEmail } from "../services/mail.services.js"
dotenv.config()
import crypto from 'crypto'


export async function registerController(req,res){
    const {username,email,password}  = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
           {username},
           {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:'user already exist with this email and username',
            success:false,
            err:'user already exist'
        })
    }


    const user = await userModel.create({username,email,password})



    const emailVerificationToken = jwt.sign({
        email:user.email,

    },process.env.JWT_SECRET)



    await sendEmail({
        to: email,
        subject: "Welcome to BRAHMA-AI!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>BRAHMA-AI</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The BRAHMA-AI Team</p>
        `
    })


    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}
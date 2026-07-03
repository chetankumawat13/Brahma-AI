import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sendEmail } from "../services/mail.services.js"
dotenv.config()



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


     res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
        }
    });


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


   

}


export async function loginController(req,res){
    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password",
            success:false,
            error:"User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid email or password",
            success:false,
            error:"Incorrect password"
        })
    }


    if(!user.verified){
        return res.status(400).json({
            message:"Please verify your email before logging in",
            success:false,
            error:"Email Not Verified"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in Successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}

export async function getMeController(req,res){
    const username = req.user.username

    if(!username){
        return res.status(404).json({
            message:"user not found",
            success:false,
            err:"user not found"
        })
    }

    const user = await userModel.findOne({username:username})

    res.status(200).json({
        message:"user fetched successfully",
        success:true,
        user:{
            username:user.username,
            email:user.email
        }
    })


}


export async function verifyEmailController(req,res){
    const {token} = req.query
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({email:decoded.email})

        if(!user){
            return res.status(400).json({
                message:"Invalid Token",
                success:false,
                err:"User not found"
            })
        }

        if(user.verified){
            return res.status(400).send(`
                <h1>Email Already Verified</h1>
               <p>This verified link expired </p>
            `)
        }

        user.verified = true

        await user.save()


        const html = `
                <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verified</title>
</head>

<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f5f7fb;display:flex;justify-content:center;align-items:center;height:100vh;">

<div style="background:#fff;padding:45px 35px;border-radius:16px;box-shadow:0 15px 40px rgba(0,0,0,.12);text-align:center;max-width:420px;width:90%;">

    <div style="width:80px;height:80px;margin:0 auto 20px;background:#d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:40px;">
        
    </div>

    <h1 style="margin:0;color:#111;font-size:30px;">
        Email Verified!
    </h1>

    <p style="margin:18px 0 30px;color:#666;font-size:16px;line-height:1.6;">
        Congratulations! Your email has been successfully verified.
        You can now log in and start using your account.
    </p>

    <a
        href="http://localhost:3000/api/auth/login"
        style="
            display:inline-block;
            text-decoration:none;
            background:#0baeb1;
            color:white;
            padding:14px 34px;
            border-radius:10px;
            font-size:16px;
            font-weight:600;
            transition:.3s;
        "
    >
        Go to Login →
    </a>

    <p style="margin-top:25px;color:#999;font-size:13px;">
        Thank you for verifying your email.
    </p>

</div>

</body>
</html>
        `

        return res.send(html)
    
    }catch(err){
        return res.status(400).json({
            message:"Invalid ad expired token",
            success:false,
            err:err.message

        })
    }
}

export async function resendEmailController(req,res){
    
}
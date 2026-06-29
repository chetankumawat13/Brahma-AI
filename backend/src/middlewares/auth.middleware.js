import jwt from 'jsonwebtoken'

async function identifyUser(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.stats(401).json({
            message:"token not provided",
            success:false,
            err:"unauthorized user, token not provided "
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token,process.env,JWT_SECRET)
    }catch(err){
        return res.stats(401).json({
            message:"unauthorized access",
            success:false,
            err:"unauthorized access"
        })
    }

    req.user = decoded

    next()

}


export default identifyUser
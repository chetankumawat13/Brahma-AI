import mongoose  from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required to create account'],
        unique:[true,"this username already exist"],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is required to create account'],
        unique:[true,"this email is already exist"],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'password is required to create account']
    },
    verified:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword,this.password)
}

const userModel = mongoose.model("user",userSchema)


export default userModel
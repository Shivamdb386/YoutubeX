import { Schema } from "mongoose";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import 'dotenv/config';

const userSchema = new Schema(
    
    {
        username: {
            type : String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type : String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type : String,
            required: true,
            trim: true,
        },
        avatar:{
            type: String,
        },
        coverimage:{
            type: String
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "video"
            }
        ],
        password:{
            type: String,
            required: [true,'Password is required']
        },
        refreshtoken:{
            type: String
        }



    },
    {
        timestamps: true
    }
)

// userschema using pre hook to encrypt password just before saving password and using next flag due to middleware
userSchema.pre("save", async function (next) {
    if(! this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    return next();
    
})
// we can also create our custom method with mongoose 
userSchema.methods.isPosswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
    
}
//same for generating Jwt tokens
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const user = mongoose.model("user",userSchema);

import { user } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async(req,res,next)=>{
    // to get the user we got the cookie from req and from cookie we got token  
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
        throw new Error("Unauth request");
        
    }
    //decoding that token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    // finally got user extracting _id from decodeedToken
    const User = await user.findById(decodedToken._id).select("-password -refreshtoken")

    if(!user){
        throw new Error("Invalid Token");
        
    }
    //setting User in req to reuse this User
    req.User = User
    next()


        
})
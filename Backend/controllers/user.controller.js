import mongoose from "mongoose"
import { asyncHandler } from "../utils/asyncHandler.js"
import {user} from "../models/user.model.js"
import { APIResponse } from "../utils/apiresponse.js"
import jwt  from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"



const  registerUser = asyncHandler(async(req,res) =>{
    // await res.status(200).json({
    //     message: "API working properly"
    // })
    const {username, email, fullname,password} = req.body
    console.log(req.body)
    console.log(email);
    console.log(username);


    if ([username, email, fullname,password].some((parvalues)=>parvalues?.trim()==="")){
        return res.status(400).json({ 
        success: false,
        error: "One or more fields are empty" })
        
    }
    const existeduser = await user.findOne({
        $or: [{username},{email}]
    })
    if(existeduser){
        return res.status(400).json({ 
        success: false,
        error: "User already existed" 
    });   
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path ;
    let coverImage = null;

    if(req.files.coverimage){
    const coverimageLocalPath = req.files?.coverimage?.[0]?.path;
     coverImage = await uploadOnCloudinary(coverimageLocalPath)
    }

    if(!avatarLocalPath){
        return res.status(400).json({ 
        success: false,
        error: "Please Upload Avatar" 
    });
    }
   const avatar= await uploadOnCloudinary(avatarLocalPath)

   
   if(!avatar){
    console.log("Unable to upload")

    }

    const User = await user.create({
        fullname,
        username,
        email,
        avatar : avatar.url,
        coverimage : coverImage?.url || "",
        password
    })
    //check if user is created or not mongodb stores _id of the entry check this by created object User
    const createduser = await user.findById(User._id).select(
        "-password -refreshtoken"
    )
    if (!createduser) {
        throw new Error(500,"Something went Wrong while creating user");
        
    }
    return res.status(201).json(
         new APIResponse(200,createduser,"user Registered successfully")
    )
    

})

const generateAccessAndRefreshToken = async(userId)=>{
  try {
    const User1 = await user.findById(userId);
    const accessToken = User1.generateAccessToken();
    const refreshToken = User1.generateRefreshToken();
   
    User1.refreshtoken = refreshToken
    User1.save({validateBeforeSave : false})
    
    return {accessToken, refreshToken}
    } catch (error) {
    console.log(error)
    throw new Error("Failed generating tokens");
    
  }
}

const loginuser = asyncHandler(async (req,res)=>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie
   const {username,email ,password} = req.body;
   console.log(email);

   if((!username && !email)|| !password){
    return res.status(401).
    json(
        new APIResponse(
            401,
            "Please enter both credentials"
        ))
    
   }
   const User = await user.findOne({
        $or: [{username}, {email}]
    })

   if(!User){
    return res.status(401).
    json(
        new APIResponse(
            401,
            "Invalid User"
        ))
    
   }

   const passwordCheck = await User.isPasswordCorrect(password)

   if(!passwordCheck){
    return res.status(401).
    json(
        new APIResponse(
            401,
            "Invalid Password"
        ))
   }
   console.log(User._id)
   const {accessToken, refreshToken} = await generateAccessAndRefreshToken(User._id)
   const loggedInUser = await user.findById(User._id).select("-password -refreshtoken ")
   
   const options = {
    httpOnly :true,
    secure : true
   }
   return res.status(200).
   cookie("accessToken",accessToken,options).
   cookie("refreshToken",refreshToken,options).
   json(
    new APIResponse(
        200,
        {
            User : loggedInUser, accessToken,refreshToken
        },
        "User LoggedIn Successfully"
    )
   )

})

const logoutuser= asyncHandler(async(req,res)=>{

// we bought the User from middleware and using it here extracting _id to set tokens empty in that user
   user.findByIdAndUpdate(req.User._id,
    {
        $set : {refreshToken : undefined}
    }
   )
   const options = {
    httpOnly :true,
    secure : true
   }

res.status(200).
clearCookie("accessToken",options).
clearCookie("refreshToken",options).
json(
    new APIResponse (200,{},"LoggedOut Successfull")
)
})

const accessRefreshToken = asyncHandler(async(req,res)=>{

    // generating refresh token again after expired auto
     const incomingrefreshtoken = req.cookies.refreshToken
     if(!incomingrefreshtoken){
        throw new Error("unauthorized request");
        
     }
     const decodedtoken = jwt.verify(incomingrefreshtoken,process.env.REFRESH_TOKEN_SECRET);
    
     const user = incomingrefreshtoken._id
     if(decodedtoken!== user.refreshtoken)
        throw new Error("Refresh token INvalid");

     const {accesstoken,newrefreshtoken} = await generateAccessAndRefreshToken(user._id);
     const options = {
        httpOnly :true,
        secure : true
       }

     return res.status(200).
     cookie("accesstoken",accesstoken,options).
     cookie("refreshtoken",newrefreshtoken,options).
     json(
        new APIResponse(
            200,
            {accesstoken,newrefreshtoken},
            "generated token again"

        )
     )
     
        
})

const changeUserPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const User = user.findById(req.User._id);

   const passwordValidate =  User.isPosswordCorrect(oldPassword)
   if(!passwordValidate){
    throw new Error("Invalid Password")
    
   }
   User.password = newPassword
   User.save({validateBeforeSave : false});

   return res.status(200).
   json(new APIResponse(200,{},"Password Changed successfully"))






})

const currentUser = asyncHandler(async(req,res)=>{
    return res.status(200).
    json(new APIResponse(200,req.User,"details"))

})

const updateUserDetails = asyncHandler(async(req,res)=>{

}
)

const getUserChannelProfile= asyncHandler(async(req,res)=>{
    const username = req.params

//Adding aggregation pipelines to find subscribers count and subscribedTo count
   const channelDetails = await user.aggregate([
        {
          $match :{
            username : username.toLowercase()
          }  
        },
        {
        // hold feild channel, will get all subscriber
          $lookup:{
            from : "subscriptions",
            localField: "_id",
            foreignField: "channel",
            as: "subscribers"
          }
        },
        {
             // hold feild subscriber, will get all subscribedTo
            $lookup:{
            from : "subscriptions",
            localField: "_id",
            foreignField: " subscriber",
            as: "subscribedTo"
          }
        },
        {
            $addFields:{
                subscriberCount:{
                    $size: "$subscribers"
                },
                subscriberToCount:{
                    $size:"$subscriberTo"
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                subscribedToCount: 1,
                avatar: 1,
                coverImage: 1,
                email: 1

            }
        }
    ])

    if(channelDetails.length === 0){
     throw new Error("Channel do not exist");
     
    }
    return res
    .status(200)
    .json(new APIResponse (200,channelDetails[0],"user channel fetched"));
    
    
})


export {registerUser,loginuser,logoutuser,accessRefreshToken,changeUserPassword,currentUser,updateUserDetails,getUserChannelProfile}
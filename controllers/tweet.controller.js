import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {user} from "../models/user.model.js"
import { APIResponse } from "../utils/apiresponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const content = JSON.stringify(req.body.content)
    console.log(content)
    if(content===""){
        throw new Error("Empty tweet");
        
    }
    console.log("userowner",req.User._id)
    const Owner =req.User
    console.log("owner", Owner)
  
    await Tweet.create({
        Owner,
        content
    })
    return res.status(200).json(new APIResponse(200,content,"Tweet added successfully"))
  })
  
  const getUserTweets = asyncHandler(async (req, res) => {
    const userId = req.params.userId
    const userTweets = await Tweet.aggregate([  
        {  
         $lookup: {  
          from: 'users',  
          localField: 'Owner',  
          foreignField: '_id',  
          as: 'owner'  
         }  
        },  
        {  
         $unwind: '$owner'  
        },  
        {  
         $match: {  
          'owner.username': userId
         }  
        },  
        {  
         $project: {  
          _id: 1,  
          content: 1,  
          owner: '$owner.username'  
         }  
        }  
      ])  
      
    console.log(userTweets)
    if(!userTweets.length){
        console.log("no tweets")
        throw new Error(400,"user have no tweets yet")
    }
  
    return res.status(200).
    json(new APIResponse(200,userTweets," "))
  })
  
  const updateTweet = asyncHandler(async (req, res) => {
    const tweetId = req.params.tweetId
  
    if(!tweetId || !isValidObjectId(tweetId)){
        throw new Error(400,"provide proper tweet id")
    }
    const updatedContent = JSON.stringify(req.body.content)
    
    const tweetContent = await Tweet.findByIdAndUpdate(
        tweetId,
        {$set: {content : updatedContent}}
    )
    if(!tweetContent){
        throw new Error("Not able to update");}
  
    return res.status(200).
    json(new APIResponse(200,tweetContent,"Updated Successfully"))
  
  })
  
  const deleteTweet = asyncHandler(async (req, res) => {
    const tweetId = req.params.tweetId
  
    if(!tweetId || !isValidObjectId(tweetId)){
        throw new Error(400,"provide proper tweet id")
    }
  
    const tweet = await Tweet.findById(tweetId)
  
    if(!tweet){
        throw new Error(404,"This tweet does not exist")
    }
    if(!(tweet.Owner).equals(req.User._id)){
        throw new Error(408,"You are not the owner of this tweet unable to edit")
    }
  
    const deleted = await Tweet.findByIdAndDelete(tweetId)
  
    if(!deleted){
        throw new Error(500,"something went wrong when deleting your tweet")
    }
  
    return res
    .status(200)
    .json(new APIResponse(200,"deleted"))
    
  })
  
  export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
  }
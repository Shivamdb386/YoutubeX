import mongoose, {isValidObjectId} from "mongoose"
import {user} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {APIResponse} from "../utils/apiresponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    const {sub} = req.query;

  if(!isValidObjectId(channelId)) {
      throw new ApiError(500, "ChannelID is required.")
  }
  console.log("user id ", req.User._id)
  if(sub === "true") {
      await Subscription.deleteOne(
          {
              channel: channelId,
              subscriber: req.User?._id
          }
      )
  }else{
      await Subscription.create({
        subscriber : req.User._id,
        channel: channelId
      })
  }

  return res
  .status(200)
  .json(
      new APIResponse(200, {}, "Subscriptiion toggled succesfully.")
  )
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId
    console.log(channelId)

    const userChannelSubscribers = await Subscription.aggregate([
      {
        $match :{
           channel : new mongoose.Types.ObjectId(String(channelId))
        }  
      },
        {
        // hold feild channel, will get all subscriber
          $lookup:{
            from : 'users',
            localField: 'subscriber',
            foreignField: '_id',
            as: 'channelSubscribers'
          }
        },
        {
          $unwind : '$channelSubscribers'
        },
        {
          $project: {
              _id: 0,
              SubscribersUserName : '$channelSubscribers.username',
              SubscribersFullName : '$channelSubscribers.fullname'
            }
        }
])
  if(!userChannelSubscribers.length){
    console.log("No Subscriber")
    throw new Error("user has no subscriber")
    }
  

  return res.status(200).
  json(new APIResponse(200,userChannelSubscribers," All the subscriber"))

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    console.log({subscriberId})
    const userSubscribedChannels = await Subscription.aggregate([
        {
          $match :{
            subscriber : new mongoose.Types.ObjectId(String(subscriberId))
          }  
        },
        {
        // hold feild channel, will get all subscriber
          $lookup:{
            from : "users",
            localField: "channel",
            foreignField: "_id",
            as: "subscribedChannels"
          }
        },
        {
          $unwind : '$subscribedChannels'
        },
        {
            $project: {
                _id : 0,
                SubscribersUserName :'$subscribedChannels.username',
                SubscribersFullName :'$subscribedChannels.fullname'
            }
        }
])
  if(!userSubscribedChannels.length){
    console.log("No Channel Subscribed")
    throw new Error("No Channel Subscribed");
    
  }

  return res.status(200).
  json(new APIResponse(200,userSubscribedChannels," All the subscribed channels"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
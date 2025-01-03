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

  if(sub === "true") {
      await Subscription.deleteOne(
          {
              channel: channelId,
              subscriber: req.user?._id
          }
      )
  }else{
      await Subscription.create({
          subscriber: req.user?._id,
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
    const {channelId} = req.params
    const userChannelSubscribers = await Subscription.aggregate([
        {
          $match :{
            channel : channelId
          }  
        },
        {
        // hold feild channel, will get all subscriber
          $lookup:{
            from : "user",
            localField: "channel",
            foreignField: "_id",
            as: "channelSubscribers"
          }
        },
        {
            $project: {
                channelSubscribers:1
            }
        }
])
  if(!userChannelSubscribers ){
    console.log("No Subscriber")
  }

  return res.status(200).
  json(new APIResponse(200,userChannelSubscribers," All the subscriber"))

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    const userSubscribedChannels = await Subscription.aggregate([
        {
          $match :{
            subscriber : subscriberId
          }  
        },
        {
        // hold feild channel, will get all subscriber
          $lookup:{
            from : "user",
            localField: "subscriber",
            foreignField: "_id",
            as: "subscribedChannels"
          }
        },
        {
            $project: {
                subscribedChannels:1
            }
        }
])
  if(!userSubscribedChannels ){
    console.log("No Channel Subscribed")
  }

  return res.status(200).
  json(new APIResponse(200,userSubscribedChannels," All the subscribed channels"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
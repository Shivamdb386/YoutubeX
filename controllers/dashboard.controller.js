import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import { APIResponse } from "../utils/apiresponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    let channelId = req.User._id
    let allVideos = await Video.find({owner : channelId})
    if (!allVideos) {
        throw new Error("No videos found");
        
    }
    return res.status(200).
    json(new APIResponse(200,allVideos,"Searched Videos"))
    
})

export {
    getChannelStats, 
    getChannelVideos
    }
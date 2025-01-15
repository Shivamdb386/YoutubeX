import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {user} from "../models/user.model.js"
//import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { APIResponse } from "../utils/apiresponse.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    console.log("title ", title);
    console.log("description", description);
    // TODO: get video, upload to cloudinary, create video
    const videoLocalPath = req.files?.videoFile[0]?.path
    if(!videoLocalPath){
        throw new Error("Video Not provided")
    }
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    if(!thumbnailLocalPath){
        throw new Error("Thumbnail Not provided")
    }
    const videofile = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    if (!videofile) {
       throw new Error("Video unable to upload");
        
    }
    if (!thumbnail) {
        throw new Error("Thumbnail unable to upload");
         
     }
    const Owner =req.User

    const video = await Video.create({
        videofile : videofile.url,
        thumbnail : thumbnail.url,
        title,
        description,
        duration : videofile.duration,
        isPublished : true,
        owner : Owner

})

if (!video) {
    throw new Error(500,"Something went Wrong while publishing video");
    
}
return res.status(201).json(
     new APIResponse(200,video,"Video published successfully")
)
    
    
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if(!videoId || !isValidObjectId(videoId)){
        throw new Error(400,"provide proper video id")
    }
    let video = await Video.findById(videoId)
    if(!video){
     throw new Error("No video Found");
     
    }
    return res.status(200).
    json(new APIResponse(200,video,"Searched Video"))
  
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description
    if(!videoId || !isValidObjectId(videoId)){
        throw new Error(400,"provide proper video id")
    }
    const {title, description} = req.body
    let video = await Video.findById(videoId)
    if(!video){
        throw new Error("No video Found");
    }

    if(!(video.owner).equals(req.User._id)){
        throw new Error(408,"You are not the owner of this video unable to edit")
    }
    let updatedVideo = await Video.findByIdAndUpdate(videoId,
        {$set: {
            title : title,
            description : description
        }}
    )
    if(!updatedVideo){
     throw new Error("Video cannot be updated");
     
    }
    return res.status(200).
    json(new APIResponse(200,updatedVideo," Video Updated Successfully"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
    if(!videoId || !isValidObjectId(videoId)){
        throw new Error(400,"provide proper video id")
    }
    let video = await Video.findById(videoId)
    if(!video){
        throw new Error("No video Found");
    }

    if(!(video.owner).equals(req.User._id)){
        throw new Error(408,"You are not the owner of this video unable to delete")
    }
    const deleted = await Video.findByIdAndDelete(videoId)
  
    if(!deleted){
        throw new Error(500,"something went wrong when deleting your video")
    }
  
    return res
    .status(200)
    .json(new APIResponse(200,"deleted"))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
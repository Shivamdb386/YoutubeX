import { Schema } from "mongoose";
import mongoose from "mongoose";

const likeSchema = new Schema({
   comment:{
    type : Schema.Types.ObjectId,
    ref : "Comment"
   },
   Video: {
    type: Schema.Types.ObjectId,
    ref: "video"
   },
   likedBy:{
    type: Schema.Types.ObjectId,
    ref: "user"
   },
   tweet:{
    type:Schema.Types.ObjectId,
    ref: "Tweet"
   }
   
   

},
{
    timestamps: true
}
)

export const Like = mongoose.model("Like",likeSchema);
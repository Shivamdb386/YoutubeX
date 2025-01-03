import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema({
   content:{
    type : String,
    required: true
   },
   Video: {
    type: Schema.Types.ObjectId,
    ref: "video"
   },
   Owner:{
    type: Schema.Types.ObjectId,
    ref: "user"
    }
   
   

},
{
    timestamps: true
}
)

export const Comment = mongoose.model("Comment",commentSchema);
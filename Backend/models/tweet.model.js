import { Schema } from "mongoose";
import mongoose from "mongoose";

const tweetSchema = new Schema({
   Owner:{
    type : Schema.Types.ObjectId,
    ref : "user"
   },
   content: {
    type: String,
    req : true
   }
},
{
    timestamps: true
}
)

export const Tweet = mongoose.model("Tweet",tweetSchema);
import { Schema } from "mongoose";
import mongoose from "mongoose";

const subscriptionschema = new Schema({
  subscriber : {
    type: Schema.Types.ObjectId,
         ref: "user"
  },
  channel : {
    type: Schema.Types.ObjectId,
    ref: "user"
  },



}, {
    timestamps: true
})

export const Subscription = mongoose.model("subscription",subscriptionschema);
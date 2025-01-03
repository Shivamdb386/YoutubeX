import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const subscriptionrouter = Router();
subscriptionrouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

subscriptionrouter
    .route("/c/:channelId")
    .get(getSubscribedChannels)
    .post(toggleSubscription);

subscriptionrouter.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default subscriptionrouter
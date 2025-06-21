import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getAllTweets,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const tweetrouter = Router();
tweetrouter.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

tweetrouter.route("/").post(verifyJWT,createTweet).get(getAllTweets);
tweetrouter.route("/user").get(getUserTweets);
tweetrouter.route("/:tweetId").patch(verifyJWT,updateTweet).delete(verifyJWT,deleteTweet);

export default tweetrouter
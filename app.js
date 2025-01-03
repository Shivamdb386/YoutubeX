import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));



import userrouter from './routers/user.router.js';
app.use("/users",userrouter)

import tweetrouter from './routers/tweet.routes.js'
app.use("/tweet",tweetrouter)

import subscriptionrouter from './routers/subscription.routes.js';
app.use("/subscribe",subscriptionrouter)

import videorouter from './routers/video.routes.js';
app.use("/video",videorouter)










export {app}
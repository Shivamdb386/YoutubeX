import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

app.use(cors({
  origin: 'https://youtube-x-wf6x.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({extended:true, limit:'50mb'}));
app.use(express.static("public"));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));



import userrouter from './routers/user.router.js';
app.use("/users",userrouter)

import tweetrouter from './routers/tweet.routes.js'
app.use("/tweet",tweetrouter)

import subscriptionrouter from './routers/subscription.routes.js';
app.use("/subscribe",subscriptionrouter)

import videorouter from './routers/video.routes.js';
app.use("/video",videorouter)

import dashboardRouter from './routers/dashboard.routes.js'
app.use("/dashboard", dashboardRouter)










export {app}
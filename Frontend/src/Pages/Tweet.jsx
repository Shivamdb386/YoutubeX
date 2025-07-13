import axios from "axios";
import React, { useEffect, useState } from "react";
import useUser from "../Context/userContext";
import AddTweets from "./AddTweets";
import useTweet from "../Context/tweetContext";

const Tweets = ()=>{
const[tweets,setTweets] = useState([]);
const[isEmptyContent,setisEmptyContent] = useState(false)
const[IsCreateTweet,setIsCreateTweet]= useState(false);
const {user} =useUser();
const {tweet}= useTweet();
const [isLoading, setIsLoading] = useState(false);

const getTweets = async()=>{
  setIsLoading(true)
  try {
    console.log(" userID ", user.data.User._id)
    const response = await axios.get(`/api/tweet/user`)
    console.log(response.data);
    console.log(!response.data.data.length)
    if(!response.data.data.length){
        setisEmptyContent(true)
        return
    }
    setTweets(response.data.data)
    setIsLoading(false)
    setisEmptyContent(false)
  } catch (error) {
    console.log(error);
  }
}

const createTweet=()=>{
 setIsCreateTweet(true);

}
useEffect(()=>{
    getTweets();
},[tweet])

const onDelete =async(tweetid)=>{
    try {
        console.log(tweetid)
        const response = await axios.delete(`/api/tweet/${tweetid}`)
        console.log(response)
        getTweets();
    } catch (error) {
        console.log(error)
    }
   
}

     return(
        <>
        <div className="flex justify-end  mt-1 mb-3">
          <button  onClick= {createTweet} type="button" class="text-white bg-gray-700 my-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-grey-600 dark:hover:bg-light-700 dark:focus:ring-blue-800">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
          </svg>
           Create
          </button>
        </div>
        <AddTweets
           isOpen={IsCreateTweet}
           onClose = {()=>{setIsCreateTweet(false)}}/>
        {isEmptyContent ? (
            <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{user.data.User.fullname} has no Tweets</h1>
            </div> 
            
        ) :
        <div>
        {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center z-50">
          <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
        {tweets.map(tweet =>(
        <div key= {tweet._id} class="max-w-xl mx-auto ml-30 mt-4 bg-white border border-gray-200 rounded-lg shadow-md p-4 font-sans">
        <div class="flex items-center mb-3">
          <img src={ user.data.User.avatar} alt="avatar" class="w-10 h-10 rounded-full object-cover mr-3" />
          <span class="font-semibold text-gray-800 text-base">{tweet.owner}</span>
        </div>
        
        <div class="max-h-40 overflow-y-auto text-gray-700 text-base leading-relaxed pr-2">
          {tweet.content}
        </div>
        <div className="flex justify-end relative group">
                   <button className="inline-grid min-h-[36px] min-w-[36px] select-none place-items-center rounded-full border border-slate-800 bg-slate-800 text-right align-middle font-sans text-sm font-medium leading-none text-slate-50 transition-all duration-300 ease-in hover:border-slate-700 hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                     onClick= {(e)=>{onDelete(tweet._id)}}
                     >
                   
                   <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                   </svg>
                   <span className="invisible group-hover:visible absolute -top-7 -translate-x-1/2 whitespace-nowrap rounded bg-slate-700 px-4 py-1 text-xs text-white">
                    Delete Item
                  </span>
                     </button>
                 </div>
            <button
           aria-label="Like tweet"
            class="absolute bottom-4 left-4 flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            >
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
           <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
              <span class="text-sm select-none">Like</span>
              </button>
            </div>
                  ))}  
                </div>}
                
                </>
     )
 }
 export default Tweets;
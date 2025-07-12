import React, { useEffect, useState } from "react";
import useUser from "../Context/userContext";
import axios from "axios";
import useSubscribe from "../Context/subscribeContext";
export default function Dashboard() {
     const { user } = useUser();
     const [videos,setVideos]= useState([])
     const [tweets,setTweets] = useState([])
     const {subscribe,setSubscribe} = useSubscribe()
     const [isLoading, setIsLoading] = useState(false);

  const userSubscribed = async()=>{
    
      try {
        const subscriberId = user?.data?.User?._id
        const response = await axios.get(`/api/subscribe/c/${subscriberId}`)
        console.log(response.data)
        setSubscribe(response.data)
      } catch (error) {
        console.log(error)
          
      } 
    }
   useEffect(()=>{
    if(user?.data?.User?._id){
    userSubscribed()}
   },[user?.data?.User?._id])

    
    const isuserSubscribed = (ownerId)=>{
     const subscribedTo= subscribe.data
     console.log(ownerId)
     if(subscribedTo.some(obj=> obj.SubscriberID ===ownerId)) return true
     else false
    }

    const subscribeUser =async(ownerId)=>{
       try {
        const response = await axios.post(`/api/subscribe/c/${ownerId}`)
        console.log(response)
        const updatedSubscribers = [...subscribe.data, { SubscriberID: ownerId }];
        console.log(updatedSubscribers)
        setSubscribe(({ ...subscribe, data: updatedSubscribers }))
        console.log(" Latest subscribe ", subscribe)
        userSubscribed();
       } catch (error) {
        console.log(error)
       }
      
    }

  const unsubscribeUser =async (ownerId)=>{

  try {
   const response=  await axios.post(`/api/subscribe/c/${ownerId }`,
    {},
    {
    params :{
      sub : true
    }
   });
    console.log(response)
    const filteredSubscribers = subscribe.data.filter(obj => obj.SubscriberID !== ownerId);
    console.log(filteredSubscribers)
    setSubscribe({data: filteredSubscribers });
    userSubscribed();
  } catch (error) {
    // Revert on error

    console.log(error);
  }
     
    }

    const getAllVideos=async()=>{
      setIsLoading(true)
      try {
        const response = await axios.get('/api/video',
          {
          params:{
           random : true,
           limit : 10
          }
        })
        console.log(response.data)
        setVideos(response.data.data)
        setIsLoading(false)
      } catch (error) {
        console.log("Frontend error")
        console.log(error)
      }
    }

    const getAllTweets =async()=>{
      try {
        const response = await axios.get('/api/tweet',{
        params:{
          random :true,
          limit:10
        }
      })
      console.log(response.data)
      setTweets(response.data.data)
      } catch (error) {
        console.log(error)
      }
      

    }
    useEffect(()=>{
      if(user?.data?.User?._id){
      getAllTweets()}
    },[user?.data?.User?._id])

    useEffect(()=>{
      if(user?.data?.User?._id){
      getAllVideos()}
    },[user?.data?.User?._id])
    return(
    <>
     <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font tracking-tight text-gray-900">Discover the future of Social Media</h1>
    </div>
  </header>
  <main>
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">Welcome to Youtube-X combining best features of Youtube and X</div>
  </main>
  <div className="relative overflow-x-hidden py-4 px-2">
  {isLoading && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
          </div>
        )}
  <div className="animate-scroll flex space-x-4 hover:animation-play-state-paused">
    {[...videos, ...videos,...videos].map((video,index) => (
      <div 
        key={`${index}-${video._id}`} 
        className="flex-shrink-0 w-[300px] mx-3 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-md font-sans"
      >
        <div className="relative">
        <img 
           src={video.thumbnail} 
           alt={video.title}
           className="w-full h-48 object-cover rounded-t-lg"
         />
        <video className="hidden w-[300px] h-[200px] bg-black object-cover" controls
         poster={video.thumbnail}>
          <source src={video.videofile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button 
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    onClick={(e) => {
                      const videoElement = e.currentTarget.previousElementSibling;
                      const thumbnailElement = e.currentTarget.previousElementSibling.previousElementSibling;
                      videoElement.classList.remove('hidden');
                      thumbnailElement.classList.add('hidden');
                      e.currentTarget.classList.add('hidden');
                      videoElement.play();
                    }}
                  >
                    <div className="bg-black bg-opacity-50 rounded-full p-4">
                      <svg 
                        className="w-12 h-12 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </button>
                  </div>
           <div className="flex items-center justify-start p-4 bg-gray-50 border-t border-gray-200">
          <img 
            src={video.owner.avatar}
            alt="avatar" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-bold text-gray-800 text-base ml-2">
            {video.owner.fullname}
          </span>
        </div>
        <div className="ml-3">
          <h5 className="text-gray-900 text-md font-medium mb-2">{video.title}</h5>
        </div>
        {}
        <div className="flex justify-end mb-4 mr-3">
          {isuserSubscribed(video.owner._id) ?
          <button onClick = {()=>{unsubscribeUser(video.owner._id)}} className="bg-gray-600 text-white text-sm font-semibold rounded-full px-5 py-1.5 transition-colors duration-300 hover:bg-gray-700 cursor-pointer">
            Subscribed
          </button> :
          <button onClick= {()=>{subscribeUser(video.owner._id)}} className="bg-red-600 text-white text-sm font-semibold rounded-full px-5 py-1.5 transition-colors duration-300 hover:bg-red-700 cursor-pointer">
            Subscribe
          </button>}

        </div>
      </div>
    ))}
  </div>
</div>
<div className="relative overflow-x-hidden py-4 px-2">
<div className="animate-scroll flex space-x-4 hover:animation-play-state-paused">
{[...tweets,...tweets].map((tweet,index)=>(
<div 
  key={`${index}-${tweet._id}`} 
  className="flex-shrink-0 w-[300px] mx-3 bg-white shadow-lg rounded-lg p-5 font-sans border border-gray-200">
  <div className="flex justify-start items-center space-x-3 mb-4">
    <img src={tweet?.Owner?.avatar || "https://avatar.iran.liara.run/public/30" } alt="avatar" className="w-10 h-10 rounded-full object-cover" />
    <span className="text-gray-700 font-semibold text-sm">{tweet?.Owner?.fullname || "User"}</span>
  </div>
  <p className="text-gray-800 text-base leading-relaxed">
    {tweet.content}
  </p>
  <button
           aria-label="Like tweet"
            className=" mt-8 flex justify-start items-bottom space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
           <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
              <span className="text-sm select-none">Like</span>
              </button>
</div>
))}
</div>
</div>





  </>
    );
  }
  

import React, { useEffect, useState } from "react";
import useUser from "../Context/userContext";
import axios from "axios";
import useSubscribe from "../Context/subscribeContext";


const Subscription = ()=>{
  console.log("Component rendered")

  const {user} = useUser()
  console.log( user.data.User._id)
  const {subscribe} = useSubscribe()
  const[totalSubscribers,setTotalSubscribers] = useState({});
  console.log("after use State")

  const userSubscriber =async()=>{
    try{
      const channelId = user.data.User._id
      const response = await axios.get(`/api/subscribe/u/${channelId}`)
      console.log(response.data)
     setTotalSubscribers(response.data)
    }catch (error){
      console.error("Error fetching subscribers:", error.response?.data || error.message);
        
    } 
  };
   useEffect(()=>{
    console.log("API called")
    if (user?.data?.User?._id) {
    userSubscriber();
  }
   },[])

  return(

    <div>
    <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font tracking-tight text-gray-900">Total Subscribers : {totalSubscribers?.data?.length}</h1>
    </div>
    </header>
    <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font tracking-tight text-gray-900">Subscribed To  : {subscribe.data.length}</h1>
    </div>
  </header>
  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>
  <h2 className="text-xl font-bold mb-4 dark:text-gray">Subscribers</h2>
  <div className="space-y-4">
        { totalSubscribers?.data?.map(subs=>(
            <div key={subs._id} className="flex items-center gap-4">
                <img className= "w-10 h-10 rounded-full" src={subs.SubscriberAvatar}/>
                <div className="font-medium dark:text-gray-900">
                    <div>{subs.SubscribersFullName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">@{subs.SubscribersUserName}</div>
                </div>
            </div>
       
         ))}
     </div>
    </div>

    <div>
        <h2 className="text-xl font-bold mb-4 dark:text-gray">Subscribed To</h2>
        <div className="space-y-4">
        { subscribe?.data?.map(subs=>(
        
            <div key= {subs._id} className="flex items-center gap-4">
                <img className="w-10 h-10 rounded-full" src={subs.SubscribersAvatar} alt="User 3"/>
                <div className="font-medium dark:text-gray-900">
                    <div>{subs.SubscribersFullName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">@{subs.SubscribersUserName}</div>
                </div>
            </div>
            
           
            
           
           ))}
           </div>
        </div>
    
</div>

  

    </div>
  
    
  )
};


export default Subscription
import axios from "axios";
import React, { useState } from "react";
import useTweet from "../Context/tweetContext";

const AddTweets = ({isOpen,onClose})=>{
       const[tweet,settweet]= useState("");
       const {setTweet} = useTweet();
       const [isLoading, setIsLoading] = useState(false);
    
    const submitTweet= async(e)=>{
        console.log("Posting Tweet")
        e.preventDefault();
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append('content',tweet);
      
      try {
        const response = await axios.post('/api/tweet/',{
            content : tweet
        })
        console.log(response.data)
        setIsLoading(false);
        setTweet(response.data)
        settweet("");
        onClose();
      } catch (error) {
        console.log(error)
      }
    }
    if (!isOpen) return null;




    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {isLoading && (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </>
                        )}
        <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add Tweet</h2>
            <button
              disabled ={isLoading}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form onSubmit={submitTweet}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tweet
              </label>
              <input
                type="text"
                value= {tweet}
                onChange={(e)=>{settweet(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled ={isLoading}
                onClick={onClose}
                className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled ={isLoading}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
  
    )
}

export default AddTweets
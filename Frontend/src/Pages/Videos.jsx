import axios from "axios";
import React, { useEffect, useState } from "react";
import useUser from "../Context/userContext";
import AddVideos from "./AddVideos";
import useVideo from "../Context/videoContext";
export default function Videos() {
    
    const [videos,setVideos] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {video} = useVideo();
    const [isLoading, setIsLoading] = useState(false);
;
    const toggleCreateButton = ()=>{
      setIsPopupOpen(true);
    }
    const onDelete=async(_id)=>{
      console.log("onDelete Clicked id ",_id)
     try {
      const response = await axios.delete(`/api/video/${_id}`)
      console.log(response);
      getVideos();
     } catch (error) {
      console.log(error);
     } 
    }

    const getVideos = ()=>{ 
      setIsLoading(true)
      return axios.get('/api/dashboard/videos')
      .then(response => {
          console.log(response.data);
          setVideos(response.data.data)
          setIsLoading(false)
       })
      .catch(error => {
          console.error(error);
       })}
     
     useEffect(()=>{
      getVideos();
     },[video]);
    
      
      return (
        <div className="container mx-auto py-1 px-1 ">
          
          <div className="w-[110%] flex justify-end  mt-1 mb-3">
          <button onClick={toggleCreateButton} type="button" class="text-white bg-gray-700 my-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-grey-600 dark:hover:bg-light-700 dark:focus:ring-blue-800">
          <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
          </svg>
           Create
          </button>
          </div>
          <AddVideos 
           isOpen={isPopupOpen}
           onClose = {()=>{setIsPopupOpen(false)}}/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex justify-center items-center z-50">
          <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
           </div>
              )}
            {videos.map(video => (
              <div key={video._id} className="rounded-lg shadow-lg bg-white">
                <div className="relative">
                  {/* Thumbnail Image */}
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  
                  {/* Hidden Video that shows on click */}
                  <video 
                    width="320" 
                    height="240" 
                    controls 
                    className="hidden w-full h-48 rounded-t-lg"
                    poster={video.thumbnail}
                  >
                    <source src={video.videofile} type="video/mp4"/>
                    Your browser does not support the video tag.
                  </video>
      
                  {/* Play Button Overlay */}
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
      
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">{video.title}</h5>
                  <p className="text-gray-700 text-base mb-4">{video.description}</p>
                  <button 
                    type="button" 
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                  <div className="flex justify-end relative group">
                   <button className="inline-grid min-h-[36px] min-w-[36px] select-none place-items-center rounded-full border border-slate-800 bg-slate-800 text-right align-middle font-sans text-sm font-medium leading-none text-slate-50 transition-all duration-300 ease-in hover:border-slate-700 hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                     onClick= {(e)=>{onDelete(video._id)}}
                     >
                   
                   <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                   </svg>
                   <span className="invisible group-hover:visible absolute -top-7 -translate-x-1/2 whitespace-nowrap rounded bg-slate-700 px-4 py-1 text-xs text-white">
                    Delete Item
                  </span>
                     </button>
                 </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      );
      
      
    } 
  
import axios from "axios";
import React, { useEffect, useState } from "react";
import useVideo from "../Context/videoContext";
const AddVideos = ({ isOpen, onClose }) => {
   

    const[title,setTitle]= useState("");
    const[description,setDescription]= useState("");
    const[videofile,setVideofile]= useState(null);
    const[thumbnail,setThumbnail]= useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {setVideo}= useVideo();
    
    const submitVideo= async(e)=>{
        console.log("Posting Video")
        e.preventDefault();
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append('title',title);
      formdata.append('description',description);
      formdata.append('videoFile',videofile);
      formdata.append('thumbnail',thumbnail);
      
      try {
        const response = await axios.post('/api/video/',formdata,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
         })
        console.log(response.data)
        setIsLoading(false);
        setVideo(response.data)
        setTitle("");
        setDescription("");
        setVideofile(null);
        setThumbnail(null);
        onClose();
      } catch (error) {
        console.log(error)
      }
    }
    if (!isOpen) return null;
  
    return (
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
            <h2 className="text-xl font-bold">Add Video</h2>
            <button
              disabled ={isLoading}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form onSubmit={submitVideo}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                value= {title}
                onChange={(e)=>{setTitle(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2"
              
              >
                Description
              </label>
              <input
                type="text"
                value= {description}
                onChange={(e)=>{setDescription(e.target.value)}}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="max-w-md mx-auto">
             <label className="block text-gray-700 text-sm font-bold mb-2">Upload Video</label>
              <input type="file"
               onChange={(e)=>{setVideofile(e.target.files[0])}}
               className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
              <p class="text-xs text-slate-500 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
              </div>
              <div class="max-w-md mx-auto">
             <label className="block text-gray-700 text-sm font-bold mb-2">Upload Thumbnail</label>
              <input type="file"
               onChange={(e)=>{setThumbnail(e.target.files[0])}}
               class="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" />
              <p class="text-xs text-slate-500 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
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
    );
  };
  
  export default AddVideos;
  
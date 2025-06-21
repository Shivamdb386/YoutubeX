import React ,{createContext, useState, useContext} from "react";

export const videoContext = createContext()

export const VideoProvider = ({ children }) => {
    const [video, setVideo] = useState(null);
  
    return (
      <videoContext.Provider value={{ video, setVideo }}>
        {children}
      </videoContext.Provider>
    );
  };

export default function useVideo() {
    return useContext(videoContext)
}


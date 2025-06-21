import React ,{createContext, useState, useContext} from "react";

export const tweetContext = createContext()

export const TweetProvider = ({ children }) => {
    const [tweet, setTweet] = useState(null);
  
    return (
      <tweetContext.Provider value={{ tweet, setTweet }}>
        {children}
      </tweetContext.Provider>
    );
  };

export default function useTweet() {
    return useContext(tweetContext)
}


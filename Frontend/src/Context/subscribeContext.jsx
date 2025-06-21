import React ,{createContext, useState, useContext} from "react";

export const subscribeContext = createContext()

export const SubscribeProvider = ({ children }) => {
    const [subscribe, setSubscribe] = useState(null);
  
    return (
      <subscribeContext.Provider value={{ subscribe, setSubscribe }}>
        {children}
      </subscribeContext.Provider>
    );
  };

export default function useSubscribe() {
    return useContext(subscribeContext)
}


import React ,{createContext, useState, useContext} from "react";

export const userContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    return (
      <userContext.Provider value={{ user, setUser }}>
        {children}
      </userContext.Provider>
    );
  };

export default function useUser() {
    return useContext(userContext)
}


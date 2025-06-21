import axios from "axios";
import React ,{createContext, useState, useContext} from "react";

export const authContext = createContext()

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

    const login = (tokens) => {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
      };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      };
    
      const refreshAccessToken = async () => {
        try {
          const response = await axios('api/users/refresh-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });
          
          const data = await response.json();
          
          if (data.accessToken) {
            setAccessToken(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
          }
        } catch (error) {
          logout();
          return null;
        }
      };
  
    return (
      <authContext.Provider value={{ accessToken, refreshToken, login, logout, refreshAccessToken }}>
        {children}
      </authContext.Provider>
    );
  };

export default function useAuth() {
    return useContext(authContext)}
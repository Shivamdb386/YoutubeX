import React from 'react';
import Example from './MainPage.jsx'
import { Route, Router, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import Videos from './Pages/Videos.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Login from './Pages/LoginPage.jsx';
import { UserProvider } from './Context/userContext.jsx';
import { VideoProvider } from './Context/videoContext.jsx';
import Tweets from './Pages/Tweet.jsx';
import { TweetProvider } from './Context/tweetContext.jsx';
import { AuthProvider } from './Context/authContext.jsx';
import SignUp from './Pages/SignUp.jsx';
import { SubscribeProvider } from './Context/subscribeContext.jsx';
import Subscription from './Pages/Subscription.jsx';
function App() {
  

  return (
  <SubscribeProvider>
  <AuthProvider>
  <UserProvider>
  <TweetProvider>
  <VideoProvider>
   <Routes>
     <Route path="/login" element={<Login/>} />
     <Route path='/signup' element = {<SignUp/>}/>
   <Route
    path="/"
    element={
      <PrivateRoute>
        <Example />
      </PrivateRoute>
    }
     >
    <Route index element = {<Dashboard/>}/>
    <Route path='/Videos' element = {<Videos/>}/>
    <Route path='/Tweets' element = {<Tweets/>}/>
    <Route path='/Subscription' element = {<Subscription/>}/>
    </Route>
   </Routes>
   </VideoProvider>
   </TweetProvider>
   </UserProvider>
   </AuthProvider>
   </SubscribeProvider>
  );
}

export default App

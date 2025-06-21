import axios from "axios";
import React, { useState } from "react";
import useUser from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const signUp=()=>{
    const navigate = useNavigate();
    const [error,setError] = useState("")
    const [email,setEmail]= useState("")
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    const [fullname,setFullname]= useState("")
    const [avatar,setAvatar]= useState(null)
    const {setUser}=useUser()

    const formdata = new FormData();
      formdata.append('username',username);
      formdata.append('fullname',fullname);
      formdata.append('email',email);
      formdata.append('password',password);
      formdata.append('avatar',avatar);

    const createAccount =async(e)=>{
     e.preventDefault()
     console.log("Clicked createAccount")

     try {
       if(password!==confirmpassword){
        setError("Password and Confirm Password do not match")
        throw new Error("Password and Confirm Password do not match")
       }
    const response = await axios.post('/api/users/register',formdata,{
       headers: {
                'Content-Type': 'multipart/form-data'
            }
    })
    console.log(response.data)
    setUser(response.data);
    navigate('/');
     
    
     }catch (error) {
        console.log(error);
        
     }
    
    }

    return(
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Flowbite    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={createAccount}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input value= {email} onChange= {(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true}/>
                  </div>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input value= {username} onChange= {(e)=>{setUsername(e.target.value)}}type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fullname</label>
                      <input value= {fullname} onChange= {(e)=>{setFullname(e.target.value)}} type="fullname" name="fullname" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input value= {password} onChange= {(e)=>{setPassword(e.target.value)}} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input value= {confirmpassword} onChange= {(e)=>{setConfirmPassword(e.target.value)}} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add your Avatar</label>
                      <input type="file" onChange={(e)=>{setAvatar(e.target.files[0])}} name="avatar" id="avatar" className="w-full text-slate-500 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-slate-500 rounded" required=""/>
                      <p class="text-xs text-slate-500 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  {error&&(
                     <div>
                        <p className="text-lg font-medium text-center text-red-700">{error}</p>
                     </div>
                    )
                  }
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

    )
}
export default signUp
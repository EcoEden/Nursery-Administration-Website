import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from 'react'
import {toast} from "react-hot-toast"
import process from 'process'
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { loginRedux } from '../Redux/userSlice';
 

const Login = () => {
  const [showPassword, SetShowPassword] = useState(false)
  // const [showConformPassword, setShowConformPassword] = useState(false)
  //variable
   const navigate=useNavigate();

   const userData =useSelector(state=>state)
   const dispatch=useDispatch()
  // showPassword
  const handleShoPassword = () => {
    alert("Are yoe sure to show password")
    SetShowPassword(preve => !preve)
  }
  const [data, setData] = useState({
   
    email: "",
    password: "",
  });
  console.log(data);
  

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }

    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
      const fetchData = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const dataRes = await fetchData.json()
      console.log(dataRes)
      toast(dataRes.message)

      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(()=>{
          navigate("/")
        },1000);
      }
      console.log(userData)
    
    } else {
      
      toast("All fields are require")
    }
  }

  return (
    <>
     
      <div className="w-1/3 min-h-[350px] p-8 mx-auto mt-4  bg-gray-100">
        <div className="mb-4">
          <img src="\All_Icons\profile.gif" alt="" className=' mx-auto rounded-full overflow-hidden bg-blend-multiply opacity-60 w-20 h-20 mx-' />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gap-6 flex flex-col mx-auto">
            <input type="email" name='email' placeholder='Enter Email' className='rounded-full p-2  ' value={data.email} onChange={handleOnchange} />
            <div className="flex relative">
              <input type={showPassword ? "text" : "pasword"} name='password' placeholder='Enter Password' className='rounded-full p-2 w-full' value={data.password} onChange={handleOnchange} />
              <span className='text-xl absolute right-0 top-2 p-1' onClick={handleShoPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>

            </div>
            <button className='rounded-full p-2 bg-secondary w-40   px-4 mx-auto text-xl my-3'>Login</button>{/* my-3 added */}
          </div>

        </form>

        {/* page link  added */}
        <div className="flex gap-2 justify-center ">
          <p> Don't have an account? </p>
          <span> <Link to={"/Signup"} className="text-secondary">SignUp.</Link></span>

        </div>
      </div>
    </>
  )
}

export default Login

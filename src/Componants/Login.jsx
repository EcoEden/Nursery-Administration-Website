import React from 'react'
import { Link } from 'react-router-dom';
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [showPassword, SetShowPassword] = useState(false)
  const [showConformPassword, setShowConformPassword] = useState(false)

  // showPassword
  const handleShoPassword = () => {
    alert("Are yoe sure to show password")
    SetShowPassword(preve => !preve)
  }
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
         //tost 
      toast('Login Successfully', {
        position: "bottom-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } else {
      
      //tost 
      toast('Please enter required fields', {
        position: "bottom-right",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <ToastContainer />
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

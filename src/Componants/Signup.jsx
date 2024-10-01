import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageToBase64 } from '../utility/ImageToBase64';
import  profileImg  from "/All_Icons/profile.gif";


const Signup = () => {
  const [showPassword, SetShowPassword] = useState(false)
  const [showConformPassword, setShowConformPassword] = useState(false)
  const handleShoPassword = () => {
    SetShowPassword(preve => !preve)
  }
  const handleShowConformPassword = () => {
    setShowConformPassword(preve => !preve)
  }
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
    image:""
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
  const handleUploadProfileImg = async (e) => {
    const data=await ImageToBase64(e.target.files[0]);
    console.log(data)

    setData((preve) => {
      return {
        ...preve,
        image:data
      }
    })
  }
//Functon for handle form 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, email, password, conformPassword } = data;
    if (firstName && email && password && conformPassword) {
      if (password === conformPassword) {
        toast(alert("Signup successfully"), {
          position: "bottom-right",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        
        navigate("/login")
      } else {
        toast('Password and Conform Password are not equal ', {
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
    } else {
      toast.warning('All fields are required ', {
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
        autoClose={300}
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
      <div className="w-full max-w-sm  min-h-[500px] p-6 mx-auto mt-4 flex-col  bg-gray-100 ">
        <div className="mb-4 mx-auto rounded-full overflow-hidden bg-blend-multiply opacity-60 w-20 h-20 drop-shadow-md shadow-md relative">
          <img src={data.image || profileImg} alt="" className='w-full h-full ' />
          <label htmlFor='profileImage'>
            <div className="absolute bottom-0 h-1/3 bg-primary bg-opacity-80 w-full flex justify-center items-center cursor-pointer ">
              <p className='text-sm p-1 text-white'>Upload</p>
            </div>
            <input type={"file"} id="profileImage" accept='image/*' className='hidden' onChange={handleUploadProfileImg} />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gap-6 flex flex-col mx-auto">
            <input type="text" name="firstName" placeholder='First Name' className='rounded-full p-2 border' value={data.firstName} onChange={handleOnchange} />
            <input type="text" name="lastName" placeholder='Last Name' className='rounded-full p-2 ' value={data.lastName} onChange={handleOnchange} />
            <input type="email" name='email' placeholder='Enter Email' className='rounded-full p-2 ' value={data.email} onChange={handleOnchange} />

            <div className="flex relative">
              <input type={showPassword ? "text" : "password"} name='password' placeholder='Enter Password' id='password' className='rounded-full w-full p-2 ' value={data.password} onChange={handleOnchange} />
              <span className='text-xl absolute right-0 top-2 p-1' onClick={handleShoPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
            </div>

            <div className="flex relative ">
              <input type={showConformPassword ? "text" : "password"} name='conformPassword' placeholder='Conform Password' className='rounded-full w-full p-2' value={data.conformPassword} onChange={handleOnchange} />
              <span className='text-xl cursor-pointer absolute right-0 top-2 p-1' onClick={handleShowConformPassword}>{showConformPassword ? <BiShow /> : <BiHide />}</span>
            </div>

            <button className=' flex justify-center  mx-auto rounded-full p-2 bg-secondary w-40  my-3 px-4  text-xl'>SignUp</button>{/* my-3 added */}

          </div>

        </form>

        {/* page link  added */}
        <div className="flex justify-center gap-2  ">
          <p> If you have an account? </p>
          <span><Link to={"/Login"} className="text-secondary  ">Login.</Link></span>
        </div>
      </div>
    </>
  )
}
export default Signup

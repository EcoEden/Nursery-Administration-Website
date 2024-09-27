import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
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
   const showPassword = () => {
        alert("Are you sure to show password")
        passwordref.current.type = "password"
        console.log(ref.current.src)

        if (ref.current.src.includes("Icons/eyecross.png")) {
            ref.current.src = "Icons/eye.png"
            passwordref.current.type = "text"
        }
        else {
            ref.current.src = "Icons/eyecross.png"
            passwordref.current.type = "password"
        }
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, email, password, conformPassword } = data;
    if (firstName && email && password && conformPassword) {
      if (password === conformPassword) {
        toast('Password Saved Successfully', {
                position: "bottom-right",
                autoClose: 400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        navigate("/login")
      } else {
        toast('Password Saved Successfully', {
                position: "bottom-right",
                autoClose: 400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
      }
    } else {
          toast('All fields required', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });    }
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
      <div className="w-1/3 min-h-[500px] p-8 mx-auto mt-4  bg-gray-100">
        <div className="mb-4">
          <img src="\All_Icons\profile.gif" alt="" className=' mx-auto rounded-full overflow-hidden bg-blend-multiply opacity-60 w-20 h-20 mx-' />
         
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gap-6 flex flex-col mx-auto">
            <input type="text" name="firstName" placeholder='First Name' className='rounded-full p-2 border' value={data.firstName} onChange={handleOnchange} />
            <input type="text" name="lastName" placeholder='Last Name' className='rounded-full p-2 ' value={data.lastName} onChange={handleOnchange} />
            <input type="email" name='email' placeholder='Enter Email' className='rounded-full p-2 ' value={data.email} onChange={handleOnchange} />
            <input type="password" name='password' placeholder='Enter Password' className='rounded-full p-2 ' value={data.password} onChange={handleOnchange} />
            <input type="password" name='conformPassword' placeholder='Conform Password' className='rounded-full p-2' value={data.conformPassword} onChange={handleOnchange} />
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

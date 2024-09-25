import React from 'react'
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <>
<div className="w-1/3 min-h-[350px] p-8 mx-auto mt-4  bg-gray-100">
        <div className="mb-4">
          <img src="\All_Icons\profile.gif" alt="" className=' mx-auto rounded-full overflow-hidden bg-blend-multiply opacity-60 w-20 h-20 mx-' />
        </div>
        <form action="">
          <div className="gap-6 flex flex-col mx-auto">
          <input type="email" name='email'placeholder='Enter Email'className='rounded-full p-2 '/>
          <input type="pasword" name='password'placeholder='Enter Password'className='rounded-full p-2 ' />
          <button className='rounded-full p-2 bg-secondary w-40   px-4 mx-auto text-xl my-3'>Login</button>{/* my-3 added */}
          </div>

        </form>

        {/* page link  added */}
        <p>
          Don't have an account?
          <Link to={"/Signup"}className="text-secondary underline ">SignUp.</Link>
        </p>
      </div>
    </>
  )
}

export default Login

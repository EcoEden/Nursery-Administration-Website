import React from 'react'
import { Link } from 'react-router-dom';


const Signup = () => {
  return (
    <>
      <div className="w-1/3 min-h-[500px] p-8 mx-auto mt-4  bg-gray-100">
        <div className="mb-4">
          <img src="\All_Icons\profile.gif" alt="" className=' mx-auto rounded-full overflow-hidden bg-blend-multiply opacity-60 w-20 h-20 mx-' />
        </div>
        <form action="">
          <div className="gap-6 flex flex-col mx-auto">
          <input type="text" name="fname"placeholder='First Name'className='rounded-full p-2 border' />
          <input type="text"  name="fname"placeholder='Last Name'className='rounded-full p-2 '/>
          <input type="email" name='email'placeholder='Enter Email'className='rounded-full p-2 '/>
          <input type="pasword" name='password'placeholder='Enter Password'className='rounded-full p-2 ' />
          <input type="pasword" name='password'placeholder='Conform Password'className='rounded-full p-2' />
          <button className='rounded-full p-2 bg-secondary w-40  my-3 px-4 mx-auto text-xl'>SignUp</button>{/* my-3 added */}
          
          </div>

        </form>
        
          {/* page link  added */}
        <p>
          If you have an account?
          <Link to={"/Login"}className="text-secondary  ">Login.</Link>
        </p>
      </div>
    </>
  )
}
export default Signup

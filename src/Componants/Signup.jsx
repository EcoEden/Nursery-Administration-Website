import React from 'react'


const Signup = () => {
  return (
    <>
      <div className="w-1/3 min-h-[500px] p-8 mx-auto mt-4  bg-gray-100">
        <div className="mb-4">
          <img src="\All_Icons\profile.gif" alt="" className=' mx-auto rounded-full overflow-hidden bg-blend-multiply opacity-20 w-20 h-20 mx-' />
        </div>
        <form action="">
          <div className="gap-6 flex flex-col mx-auto">
          <input type="text" name="fname"placeholder='First Name'className='rounded-full p-2 border' />
          <input type="text"  name="fname"placeholder='Last Name'className='rounded-full p-2 '/>
          <input type="email" name='email'placeholder='Enter Email'className='rounded-full p-2 '/>
          <input type="pasword" name='password'placeholder='Enter Password'className='rounded-full p-2 ' />
          <input type="pasword" name='password'placeholder='Conform Password'className='rounded-full p-2' />
          <button className='rounded-full p-2 bg-secondary w-40   px-4 mx-auto text-xl'>SignUp</button>
          </div>

        </form>
      </div>
    </>
  )
}
export default Signup

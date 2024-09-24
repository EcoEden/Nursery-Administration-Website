import React from 'react'

const Login = () => {
  return (
    <>
    <div className='w-full  mb-10 pt-24 '>
      <div className='w-[80vh] h-screen mx-auto my-10 px-10 py-15 bg-gray-100'>
        <div className='flex flex-col gap-7 m-7'>
        <h1 className='mt-10  text-2xl font-bold'>Sign Up</h1>
        <form action="">
            <input type="text" placeholder=' First Name' className='h-[50px]  border-orange-700	border-solid	w-full pl-5 border-2 rounded-md outline-none text-lg	' />
            <input type="text" placeholder=' First Name' className='h-[50px]  border-orange-700	border-solid	w-full pl-5 border-2 rounded-md outline-none text-lg	' />
            <input type="email" placeholder='Enter your Email'  className='h-[50px] border-orange-700	border-solid	w-full pl-5 border-2 rounded-md outline-none text-lg	' />
            <input type="password" placeholder='Enter Your Password'  className='h-[50px] border-orange-700	border-solid	w-full pl-5 border-2 rounded-md outline-none text-lg	' />
        </form>
            <button className='w-28 h-11 bg-secondary mt-7 border-none text-xl cursor-pointer font-medium size-20 rounded-lg'>Continue</button>
            <p className='mt-5 font-medium text-zinc-500 text-lg	' >Already have an account?<span className='font-semibold	text-textSecondary'>Login here.</span></p>
            <div className='flex items-center mt-6 gap-4 text-lg font-medium text-slate-500 	'>
                <input type="checkbox" name='' id='' className='checked:bg-secondary'/>
                <p>By continuing I agree to the terms of use & privacy policy.</p>
            </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default Login

import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate=useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
  });
  console.log(data);

  const handleOnchange=(e)=>{ 
    const {name,value}=e.target
    setData((preve)=>{
      return{
        ...preve,
        [name]: value
      }
      
    })
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const {firstName,email,password,conformPassword}=data;
    if(firstName && email && password && conformPassword){
      if(password === conformPassword){
        alert("Success");
        navigate("/login")
      }else{
        alert(" Password and Conform Password in not matched");
      }
    }else{
      alert("Please enter required fields");
    }
  }

  return (
    <>
      <div className="w-1/3 min-h-[500px] p-8 mx-auto mt-4  bg-gray-100">
        <div className="mb-4">
          <img src="\All_Icons\profile.gif" alt="" className=' mx-auto rounded-full overflow-hidden bg-blend-multiply opacity-60 w-20 h-20 mx-' />
          <div className="">
           <p>upload</p>

          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gap-6 flex flex-col mx-auto">
            <input type="text" name="firstName" placeholder='First Name' className='rounded-full p-2 border' value={data.firstName} onChange={handleOnchange} />
            <input type="text" name="lastName" placeholder='Last Name' className='rounded-full p-2 ' value={data.lastName} onChange={handleOnchange} />
            <input type="email" name='email' placeholder='Enter Email' className='rounded-full p-2 ' value={data.email} onChange={handleOnchange}  />
            <input type="password" name='password' placeholder='Enter Password' className='rounded-full p-2 ' value={data.password} onChange={handleOnchange} />
            <input type="password" name='conformPassword' placeholder='Conform Password' className='rounded-full p-2' value={data.conformPassword} onChange={handleOnchange} />
            <button className='rounded-full p-2 bg-secondary w-40  my-3 px-4 mx-auto text-xl'>SignUp</button>{/* my-3 added */}

          </div>

        </form>

        {/* page link  added */}
        <p>
          If you have an account?
          <Link to={"/Login"} className="text-secondary  ">Login.</Link>
        </p>
      </div>
    </>
  )
}
export default Signup

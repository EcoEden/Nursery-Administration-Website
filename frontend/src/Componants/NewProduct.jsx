import React, { useState } from 'react'
import { BsCloudUpload } from "react-icons/bs";
import { ImageToBase64 } from '../utility/ImageToBase64';


const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    iamge: "",
    price: "",
    description: ""
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
  
  };

  const uploadImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);
    // console.log(data)
    setData((preve) => {
      return {
        ...preve,
        image: data
      }
    })

  };

  const handleSubmit = async(e) => {
    console.log(data);
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
    const fetchData= await fetch(`${baseUrl}/NewProduct`,{
      method:"post",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify(data)
    })

    const fetchRes=await fetchData.json();
    console.log(fetchRes)

  };


  return (
    <div className='p-8'>
      <form className='m-auto w-full max-w-lg shadow drop-shadow flex flex-col  bg-white p-2 gap-2 text-xl' onSubmit={handleSubmit}>
        <label htmlFor="name" className=''>Name:</label>
        <input type="text" name="name" className='bg-slate-200 p-2  my-1 rounded-lg' onChange={handleOnchange} />

        <label htmlFor="category" className=''>Category:</label>
        <select className=' bg-slate-200 my-1 rounded-lg p-2  ' id="category" name='category' onChange={handleOnchange}>
          <option >Indoor Plant</option>
          <option >Outdoor Plant</option>
        </select>

        <label htmlFor="image" className='cursor-pointer'>Image:
          <div className="h-60 w-90% bg-slate-200 mb-3 rounded-lg flex items-center justify-center " >
            {
              data.image ? <img src={data.image} alt="" className='h-full ' /> : <span className='text-5xl '><BsCloudUpload /></span>
            }



            <input type="file" accept='image/*' name='image' onChange={uploadImage} className='hidden p-2' id="image" />
          </div>
        </label>

        <label htmlFor="price" className=' '>Price:</label>
        <input type="text" name="price" className='bg-slate-200  mb-2 rounded-lg p-2' onChange={handleOnchange} />

        <label htmlFor="description" className=''>Description:</label>
        <textarea name="description" id="description" rows={3} className='bg-slate-200  rounded-lg my-1 resize-none ' onChange={handleOnchange}></textarea>

        <button className=' bg-secondary text-white text-lg  rounded-lg font-md my-2 drop-shadow hover:bg-green-400 p-2'>Upload</button>
      </form>
    </div>
  )
}

export default NewProduct

import React from 'react'
import { BsCloudUpload } from "react-icons/bs";

const NewProduct = () => {
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-lg shadow flex flex-col '>
        <label htmlFor="name" className='mx-3'>Name:</label>
        <input type="text" name="name" className='bg-slate-100 p-1 mx-3'/>

        <select className='mx-3'>
          <option >Indoor Plant</option>
          <option >Outdoor Plant</option>
        </select>

        <div className="h-60 w-90% bg-slate-200 my-3 rounded-lg flex items-center justify-center mx-3">
          <span className='text-5xl'><BsCloudUpload /></span>
        </div>
      </form>
    </div>
  )
}

export default NewProduct

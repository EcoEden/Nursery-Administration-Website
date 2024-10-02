import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter,RouterProvider } from 'react-router-dom';

import './App.css'
import Home from './Componants/Home'
import ProductDeatails from './Componants/ProductDeatails';
import Navbar from './Componants/Navbar'
import Login from './Componants/Login'
import About from './Componants/About';
import Contact from './Componants/Contact';
import Signup from './Componants/Signup';
import Menu from './Componants/Menu';
import NewProduct from './Componants/NewProduct';

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/> <Home/></>,
    },
     {
      path:"/login",
      element:<><Navbar/> <Login/></>,
    },
    {
      path:"/productDeatails",
      element:<><Navbar/><ProductDeatails/></>,
    },
    {
      path:"/about",
      element:<><Navbar/><About/></>,
    },
    {
      path:"/contact",
      element:<><Navbar/><Contact/></>,
    },

    // signup path added
    {
      path:"/signup",
      element:<><Navbar/> <Signup/></>, 
    },
    // menu path added
    {
      path:"/menu",
      element:<><Navbar/> <Menu/></>,
    },
    {
      path:"/newproduct",
      element:<><Navbar/> <NewProduct/></>,
    },
  ])


  return (
    <>
       <RouterProvider router={router}/>

    </>
  )
}

export default App

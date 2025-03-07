import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './Componants/Navbar'
import Footer from './Componants/Footer';
import toast, { Toaster } from 'react-hot-toast';
import Navbar1 from './Componants/Navbar1'


function App() {


  return (
    <> <Toaster />
    <Navbar1/>
    {/* <Navbar/> */}
      <main>
        <Outlet/>
      </main>
    <Footer/>
    </>
  )
}

export default App

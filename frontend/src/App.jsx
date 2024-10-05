import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './Componants/Navbar'
import toast, { Toaster } from 'react-hot-toast';


function App() {


  return (
    <> <Toaster />
    <Navbar/>
      <main>
        <Outlet/>
      </main>

    </>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './Componants/Common/Navbar'
import Footer from './Componants/Common/Footer';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />

      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}


export default App;

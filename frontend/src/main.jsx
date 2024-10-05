import { StrictMode } from 'react'
import { Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './Componants/Home.jsx';
import Menu from './Componants/Menu.jsx';
import Contact from './Componants/Contact.jsx';
import About from './Componants/About.jsx';
import Login from './Componants/Login.jsx';
import Signup from './Componants/Signup.jsx';
import NewProduct from './Componants/NewProduct.jsx';
import {store} from './Redux/index.jsx';
import { Provider } from 'react-redux';

//Routes
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
     <Route index element={<Home/>}/>
     <Route path='menu' element={<Menu/>}/>
     <Route path='contact' element={<Contact/>}/>
     <Route path='about' element={<About/>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='signup' element={<Signup/>}/>
     <Route path='newproduct' element={<NewProduct/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <RouterProvider router={router}/>
  </Provider>
  
)

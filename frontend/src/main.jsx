import { StrictMode } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './Componants/Home.jsx';
import Menu from './Componants/Menu.jsx';
import Contact from './Componants/Contact.jsx';
import About from './Componants/About.jsx';
import Login from './Componants/Login.jsx';
import Signup from './Componants/Signup.jsx';
import Footer from './Componants/Footer.jsx';
import NewProduct from './Componants/NewProduct.jsx';
import Profile from './Componants/Profile.jsx';
import Gardening from './Componants/Services/Gardening.jsx';
import IndoorPlants from './Componants/Services/IndoorPlants.jsx';
import OutdoorPlants from './Componants/Services/OutdoorPlants.jsx';
import PlantCare from './Componants/Services/PlantCare.jsx';
import Herbs from './Componants/Services/Herbs.jsx';
import DecorPots from './Componants/Services/DecorPots.jsx';
import { store } from './Redux/index.jsx';
import { Provider } from 'react-redux';

//Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='menu' element={<Menu />} />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='newproduct' element={<NewProduct />} />
      <Route path='footer' element={<Footer />} />
      
      {/* Service Pages */}
      <Route path='gardening' element={<Gardening />} />
      <Route path='indoor-plants' element={<IndoorPlants />} />
      <Route path='outdoor-plants' element={<OutdoorPlants />} />
      <Route path='plant-care' element={<PlantCare />} />
      <Route path='herbs' element={<Herbs />} />
      <Route path='decor-pots' element={<DecorPots />} />

    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>

)

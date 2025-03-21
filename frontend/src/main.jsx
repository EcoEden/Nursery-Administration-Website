import { StrictMode } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import Home from "./Componants/Home.jsx";
import Menu from "./Componants/Menu.jsx";
import Contact from "./Componants/Contact.jsx";
import About from "./Componants/About.jsx";
import Login from "./Componants/Login.jsx";
import Signup from "./Componants/Signup.jsx";
import Footer from "./Componants/Footer.jsx";
import NewProduct from "./Componants/NewProduct.jsx";
import Gardening from "./Componants/Services/Gardening.jsx";
import IndoorPlants from "./Componants/Services/IndoorPlants.jsx";
import OutdoorPlants from "./Componants/Services/OutdoorPlants.jsx";
import PlantCare from "./Componants/Services/PlantCare.jsx";
import Herbs from "./Componants/Services/Herbs.jsx";
import DecorPots from "./Componants/Services/DecorPots.jsx";
import ProductPage from "./Componants/ProductPage.jsx";
import UserProfile from "./Componants/UserProfile.jsx";
import SearchResults from "./Componants/SearchResults";
import Cart from "./Componants/Cart.jsx"

import { store } from "./Redux/index.jsx";

// ✅ Protected Route Component
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

// ✅ Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="ourcollection" element={<Menu />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="footer" element={<Footer />} />
      <Route path="/profile/:userId" element={<UserProfile />} />

      {/* 🔒 Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="newproduct" element={<NewProduct />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Service Pages */}
      <Route path="gardening" element={<Gardening />} />
      <Route path="indoor-plants" element={<IndoorPlants />} />
      <Route path="outdoor-plants" element={<OutdoorPlants />} />
      <Route path="plant-care" element={<PlantCare />} />
      <Route path="herbs" element={<Herbs />} />
      <Route path="decor-pots" element={<DecorPots />} />

      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/search/:query" element={<SearchResults />} />

      <Route path="cart" element={<Cart />} />
    </Route>
  )
);

// ✅ Render
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

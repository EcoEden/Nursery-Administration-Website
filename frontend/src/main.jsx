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
import Home from "./Componants/Pages/Home.jsx";
import Menu from "./Componants/Pages/Menu.jsx";
import About from "./Componants/Pages/About.jsx";
import Login from "./Componants/User/Login.jsx";
import Signup from "./Componants/User/Signup.jsx";
import Footer from "./Componants/Common/Footer.jsx";
import NewProduct from "./Componants/Seller/NewProduct.jsx";
import Gardening from "./Componants/Services/Gardening.jsx";
import IndoorPlants from "./Componants/Services/IndoorPlants.jsx";
import OutdoorPlants from "./Componants/Services/OutdoorPlants.jsx";
import PlantCare from "./Componants/Services/PlantCare.jsx";
import Herbs from "./Componants/Services/Herbs.jsx";
import DecorPots from "./Componants/Services/DecorPots.jsx";
import ProductPage from "./Componants/Pages/ProductPage.jsx";
import UserProfile from "./Componants/User/UserProfile.jsx";
import SearchResults from "./Componants/Common/SearchResults.jsx";
import Cart from "./Componants/Pages/Cart.jsx"
import SellerDashboard from "./Componants/Seller/SellerDashboard.jsx";
import EditProduct from "./Componants/Seller/EditProduct.jsx";
import SellerProducts from "./Componants/Seller/SellerProducts.jsx";

//Admin
import AdminDashboard from "./Componants/Admin/AdminDashboard.jsx";
import UsersList from "./Componants/Admin/UsersList.jsx";
import SellersList from "./Componants/Admin/SellersList.jsx";
import { store } from "./Redux/index.jsx";
import UserOrders from "./Componants/Admin/UserOrders.jsx";
import SellerProduct from "./Componants/Admin/SellerProducts.jsx";



//  Protected Route Component
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

//  Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="ourcollection" element={<Menu />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="footer" element={<Footer />} />
      <Route path="/profile/:userId" element={<UserProfile />} />


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

      {/* Seller Routes */}
      <Route path="seller-dashboard" element={<SellerDashboard />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="seller-products" element={<SellerProducts />} />
      <Route path="new-product" element={<NewProduct />} />

      {/* Admin Routes */}

      <Route path="admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UsersList />} />
      <Route path="/admin/users/:userId/orders" element={<UserOrders />} />

      <Route path="/admin/sellers" element={<SellersList />} />
      {/* <Route path="/admin/sellers/:id" element={<SellerDetails />} /> */}
      <Route path="/sellers/:sellerId/products" element={<SellerProduct />} />

    </Route>
  )
);


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

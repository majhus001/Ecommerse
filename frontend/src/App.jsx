import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/Homepage/HomePage';
import SignUp from './LogSin/SignUp';
import Login from './LogSin/Login';
import ProductPage from './screens/Productscreens/Products';
import ProductAddPage from './Admin/Productadd';
import ProductList from './screens/Productscreens/ProductList';
import Cart from './screens/Productscreens/Cart';
import Navbar from './screens/navbar/Navbar';
import Orderdetails from './screens/Order/Orderdetails';
import Orderhistory from './screens/Order/Orderhistory';
import Sidebar from './screens/sidebar/Sidebar';
import UserProfile from './screens/profiledetails/UserProfile';
import ProfilePage from './screens/profiledetails/ProfilePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set initial route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/prodlist" element={<ProductList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/ho" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adprod" element={<ProductAddPage />} />
        <Route path="/orderdet" element={<Orderdetails />} />
        <Route path="/myorders" element={<Orderhistory />} />
        <Route path="/side" element={<Sidebar />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/profilepage" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
};

export default App;

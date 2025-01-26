import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/Homepage/HomePage';
import SignUp from './LogSin/SignUp';
import Login from './LogSin/Login';
import ProductPage from './screens/Productscreens/Products';
import ProductAddPage from './Admin/Productadd';
import ProductList from './screens/Productscreens/ProductList';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set initial route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prodlist" element={<ProductList />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/adprod" element={<ProductAddPage />} />

      </Routes>
    </Router>
  );
};

export default App;

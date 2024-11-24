import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from '../components/Footer/Footer';
import LoginPopup from '../components/LoginPopup/LoginPopup';
import Cart from './Pages/Cart/Cart';
import ConfirmOrder from './confirmeOrder/confirmeOrder';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div id="preloader"></div>
      ) : (
        <div>
          {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
          <div className="app">
            <Navbar setShowLogin={setShowLogin} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/confirme-order" element={<ConfirmOrder />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;

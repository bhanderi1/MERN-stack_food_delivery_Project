import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from '../components/Footer/Footer'
import LoginPopup from '../components/LoginPopup/LoginPopup'
import Cart from './Pages/Cart/Cart'
import ConfirmOrder from './confirmeOrder/confirmeOrder'

const App = () => {
  const [showLogin,setShowLogin] =useState(false)
  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder />} />
<<<<<<< HEAD
          <Route path='/confirme-order' element={<ConfirmOrder />} />
=======
          <Route path='order' element={<ConfirmOrder />} />
>>>>>>> 3c841a4e8da9f807cdd15bfbab9a601cfd8ff124
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App

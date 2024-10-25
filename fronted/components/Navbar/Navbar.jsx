import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../src/assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../src/context/StoreContext';
import axios from 'axios';

const Navbar = ({ setShowLogin }) => {
    const [menu, setmenu] = useState("home");
    const { getTotalCartAmount } = useContext(StoreContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.delete('http://localhost:4000/api/user/logout', { withCredentials: true });
            setIsAuthenticated(false);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
            <ul className='navbar-menu'>
                <Link to="/" onClick={() => setmenu("home")} className={menu === 'home' ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setmenu("menu")} className={menu === 'menu' ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setmenu("mobile-app")} className={menu === 'mobile-app' ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setmenu("contact-us")} className={menu === 'contact-us' ? "active" : ""}>Contact us</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt='' />
                <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt='' /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}> </div>
                </div>
                {!isAuthenticated ? (
                    <button onClick={() => setShowLogin(true)}>
                        Sign In
                    </button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li><img src={assets.bag_icon} alt="" />Orders</li>
                            <hr />
                            <li onClick={handleLogout}><img src={assets.logout_icon} alt="" />Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
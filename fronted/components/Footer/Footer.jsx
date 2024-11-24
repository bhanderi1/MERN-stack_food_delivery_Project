import React from 'react'
import './Footer.css'
import { assets } from '../../src/assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.logo} alt='' />
          <p>Lorem ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ener since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <div className='footer-social-icons'>
            <a href='https://facebook.com/tomato' target='_blank'>
              <img src={assets.facebook_icon} alt='facebook icon' />
            </a>
            <a href='https://twitter.com/tomato' target='_blank'>
              <img src={assets.twitter_icon} alt='twitter icon' />
            </a>
            <a href='https://linkedin.com/company/tomato' target='_blank'>
              <img src={assets.linkedin_icon} alt='linkedin icon' />
            </a>
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUNCH</h2>
          <ul>
            <li>
              <a href='tel:+12124567890'>+1-212-456-7890</a>
            </li>
            <li>
              <a href='mailto:contact@tomato.com'>contact@tomato.com</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 © Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer

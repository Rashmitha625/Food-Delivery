// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Dummy text is also known as filler text or placeholder text, and it has been used for a long time in the various fields of online publishing.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
              </ul>  
            </div>
            <div className="footer-content-right">
               <h2>GET IN TOUCH</h2>
               <ul>
                <li>7654328989</li>
                <li>contact@tomato.com</li>
               </ul>
            </div>
            
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ Tomato.com - All Right Reserved.</p>
      
    </div>
  )
}

export default Footer

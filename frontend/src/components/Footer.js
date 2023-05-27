import React from 'react'
import "../styles/footer.css"
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaWifi } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='main-footer-container'>
        <div className='footer-container'>
            <div className='icon-container'>
                <FaFacebook />
                <FaTwitter />
                <FaInstagram />
                <FaPinterest />
            </div>
            <div className='text-container white'>
                WellnessCenter2023
            </div>
        </div>
    </div>
  )
}

export default Footer

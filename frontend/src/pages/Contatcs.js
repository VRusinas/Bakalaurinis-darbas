import React from 'react';
import "../styles/global.css";
import "../styles/contacts.css";
import "../styles/button.css";

const Contacts = () => {
  return (
    <div className='contacts-container'>
      <div className="contacts-page">
        <h1>Contact us</h1>
        <div className="contact-info">
          <p><strong>Address:</strong> 123 Main Street</p>
          <p><strong>Work hours:</strong> I-VII, 08:00 - 20:00</p>
          <p><strong>City, State Zip Code:</strong> Lorem, lorem ipsum </p>
          <p><strong>Country:</strong> Lorem</p>
          <p><strong>Phone:</strong> +1 (111) 111-1111</p>
          <p><strong>Email:</strong> wellnesscenterbd2023@gmail.com</p>
        </div>
        <p><strong>You can find us here!</strong></p>
          <iframe
          className='map-style'
            title="Google Maps View"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.642165786494!2d-86.15688118454031!3d39.77404063420616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8814ac16ef54d1e7%3A0xb851d7aa96a0dd3a!2sLucas%20Oil%20Stadium!5e0!3m2!1sen!2sus!4v1652085320585!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
            <a
            className='button'
              href="https://www.google.com/maps/place/123+Main+St,+City,+State+Zip+Code"
              target="_blank"
              rel="noopener noreferrer"
            >
              View it on Google Maps
            </a>
        </div>
    </div>
  );
};

export default Contacts;

import React from 'react'
import MassageDescriptions from '../../pages/MassageDescriptions'
import RegisterMassageBtn from './RegisterMassageBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const LymphaticDrainageMassage = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><MassageDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/lymphatic.jpg' alt='Lymphatic drainage'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Lymphatic drainage massage</h1></div>
          Lymphatic drainage massage is a therapeutic technique 
          that aims to stimulate the lymphatic system to remove excess 
          fluid and waste products from the body. The benefits of lymphatic 
          drainage massage are numerous and can help with a range of conditions. 
          One of the primary benefits of lymphatic drainage massage is its 
          ability to reduce swelling and edema. By stimulating the 
          lymphatic system, lymphatic drainage massage can help to remove excess 
          fluid and reduce swelling in the body. <br/><br/>
          In addition lymphatic drainage massage can also be effective in 
          promoting detoxification and improving immune function. The lymphatic 
          system plays a critical role in removing toxins and waste products 
          from the body, and lymphatic drainage massage can help to enhance this 
          process. By improving immune function, lymphatic drainage massage 
          can also help to prevent illness and disease.
          <h5>Hourly rate for lymphatic drainage massage is XX€/h.</h5>
            <RegisterMassageBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="lymphaticDrainage"/></div>
    </div>
  )
}

export default LymphaticDrainageMassage
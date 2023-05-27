import React from 'react'
import MassageDescriptions from '../../pages/MassageDescriptions'
import RegisterMassageBtn from './RegisterMassageBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"


const PressurePointMassage = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><MassageDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/pressurePoint.jpg' alt='Pressure point'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Pressure point massage</h1></div>
          Pressure point massage is a therapeutic technique that involves 
          applying pressure to specific points on the body to alleviate 
          pain and tension. The benefits of pressure point massage are 
          numerous and can help with a range of conditions. One of the 
          primary benefits of pressure point massage is its ability to 
          relieve pain and tension in the muscles and joints. 
          By applying pressure to specific points on the body, pressure 
          point massage can help to release tension and alleviate pain, 
          promoting relaxation and improved mobility. <br/><br/>
          In addition pressure point massage can also be effective in reducing 
          stress and promoting relaxation. By targeting specific pressure
          points on the body, pressure point massage can help to calm the 
          nervous system, reduce stress levels, and promote a sense of 
          relaxation and well-being. Additionally, pressure point massage 
          can improve circulation, promote lymphatic drainage, and boost 
          the immune system, helping to remove toxins from the body and 
          promote overall health and well-being.
          <h5>Hourly rate for pressure point massage is XX€/h.</h5>
            <RegisterMassageBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="pressurePoint"/></div>
    </div>
  )
}

export default PressurePointMassage
import React from 'react'
import PhysiotherapyDescriptions from '../../pages/PhysiotherapyDescriptions'
import CommentSection from '../CommentSection'
import RegisterPhysioBtn from './RegisterPhysioBtn'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const SportsPhysiotherapy = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><PhysiotherapyDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/sportsPhysio.jpg' alt='sports physiotherapy'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Sports physiotherapy</h1></div>
          Sports physiotherapy is a specialized field of physical therapy that 
          focuses on treating and preventing injuries related to sports and 
          physical activity. Sports physiotherapists work with athletes of all 
          levels and ages, from recreational athletes to professional athletes, 
          to help them recover from injuries, prevent future injuries, and improve 
          their overall athletic performance. <br/><br/>
          One of the main goals of sports physiotherapy is to help athletes 
          recover from injuries quickly and safely, so they can return to their 
          sport as soon as possible. Sports physiotherapists use a variety of techniques, 
          such as massage, stretching, strengthening exercises, and manual therapy, 
          to help athletes regain their strength, flexibility, and range of motion 
          after an injury. They may also use specialized equipment, such as braces or 
          taping, to support the injured area and promote healing.
          <h5>Hourly rate for sports physiotherapy is XX€/h.</h5>
            <RegisterPhysioBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="sportsPhysiotherapy"/></div>
    </div>
  )
}



export default SportsPhysiotherapy
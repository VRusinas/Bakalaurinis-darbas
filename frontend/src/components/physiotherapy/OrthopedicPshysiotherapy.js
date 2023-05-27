import React from 'react'
import PhysiotherapyDescriptions from '../../pages/PhysiotherapyDescriptions'
import CommentSection from '../CommentSection'
import RegisterPhysioBtn from './RegisterPhysioBtn'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const OrthopedicPshysiotherapy = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><PhysiotherapyDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/orthopedicPhysio.jpg' alt='Orthopedic pshysiotherapy'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Orthopedic pshysiotherapy</h1></div>
          Orthopedic physiotherapy is a specialized field of physical therapy 
          that focuses on the assessment, diagnosis, and treatment of musculoskeletal 
          injuries and conditions. Orthopedic physiotherapists work with patients of all 
          ages, from children to the elderly, to help them recover from injuries or 
          conditions affecting their bones, muscles, ligaments, and joints. <br/> <br/>
          One of the main goals of orthopedic physiotherapy is to improve the 
          patient's ability to move and perform daily activities, such as walking, 
          lifting, and bending. Orthopedic physiotherapists use a variety of 
          techniques, such as manual therapy, exercise prescription, and modalities 
          like heat or cold, to improve joint range of motion, strength, 
          flexibility, and function.
          <h5>Hourly rate for this orthopedic pshysiotherapy is XX€/h.</h5>
            <RegisterPhysioBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="orthopedicPshysiotherapy"/></div>
    </div>
  )
}


export default OrthopedicPshysiotherapy
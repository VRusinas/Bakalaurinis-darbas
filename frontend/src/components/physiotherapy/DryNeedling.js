import React from 'react'
import PhysiotherapyDescriptions from '../../pages/PhysiotherapyDescriptions'
import CommentSection from '../CommentSection'
import RegisterPhysioBtn from './RegisterPhysioBtn'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const DryNeedling = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><PhysiotherapyDescriptions/></div>

      <div className='descriptions '>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/dryNeedle.jpg' alt='Dry needling'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Dry needling physiotherapy</h1></div>
          Dry needling physiotherapy can be especially beneficial for 
          people with chronic pain or injuries that have not responded 
          to other treatments. It can help to reduce muscle tension and 
          spasms, increase range of motion, and promote healing by increasing 
          blood flow and oxygen to the affected area. The technique is often 
          used in conjunction with other physiotherapy treatments, such as 
          massage, stretching, and exercise, to help patients achieve their 
          treatment goals. <br/> <br/>
          One of the benefits of dry needling is 
          that it is a relatively non-invasive treatment 
          option. The needles used in dry needling are very 
          thin and are inserted just beneath the skin, so patients 
          typically experience only mild discomfort during the procedure. 
          The number of needles used and the depth of insertion can be 
          adjusted to suit the individual patient's needs.
          <h5>Hourly rate for dry needling physiotherapy is XX€/h.</h5>
            <RegisterPhysioBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="dryNeedling"/></div>
    </div>
  )
}


export default DryNeedling
import React from 'react'
import MassageDescriptions from '../../pages/MassageDescriptions'
import RegisterMassageBtn from './RegisterMassageBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const SportsMassage = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><MassageDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/sports.jpg' alt='Sports massage'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Sports massage</h1></div>
          Sports massage is a therapeutic technique that is designed
          to help athletes prepare for and recover from physical activity. 
          The benefits of sports massage are numerous and can help with 
          a range of conditions. One of the primary benefits of sports 
          massage is its ability to improve athletic performance. 
          By increasing circulation and promoting muscle flexibility, 
          sports massage can help to improve range of motion and reduce 
          the risk of injury, allowing athletes to perform at their best.<br/><br/>
          Sports massage can also be effective in reducing muscle 
          soreness and promoting faster recovery after physical activity. 
          By reducing muscle tension and improving circulation, sports 
          massage can help to alleviate muscle soreness and promote 
          faster healing of muscle tissues. Additionally, sports massage 
          can be used to treat a variety of conditions, 
          including tendonitis, sprains, and strains.
          <h5>Hourly rate for sports massage is XX€/h.</h5>
            <RegisterMassageBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="sports"/></div>
    </div>
  )
}

export default SportsMassage
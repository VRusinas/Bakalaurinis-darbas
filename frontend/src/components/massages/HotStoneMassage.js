import React from 'react'
import MassageDescriptions from '../../pages/MassageDescriptions'
import RegisterMassageBtn from './RegisterMassageBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const HotStoneMassage = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><MassageDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/hotStone.jpg' alt='Hot stone'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Hot stone massage</h1></div>
          Hot stone massage is a therapeutic technique that uses heated 
          stones to target specific areas of the body, such as the back, 
          neck, and shoulders. The benefits of hot stone massage are numerous 
          and can help with a range of conditions. One of the primary benefits 
          of hot stone massage is its ability to promote relaxation and 
          reduce stress. The warmth of the stones can help to calm the nervous 
          system, promoting a sense of relaxation and well-being. <br/><br/>
          In addition hot stone massage can also be effective in reducing 
          muscle tension and promoting pain relief. The heat from the stones 
          can penetrate deep into the muscles, helping to relax tight muscles 
          and alleviate pain and discomfort. Additionally, hot stone 
          massage can improve circulation and promote lymphatic drainage, 
          helping to remove toxins from the body and promote overall health 
          and well-being.
          <h5>Hourly rate for hot stone massage is XX€/h.</h5>
            <RegisterMassageBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="hotStone"/></div>
    </div>
  )
}

export default HotStoneMassage
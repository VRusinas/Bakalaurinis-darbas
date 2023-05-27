import React from 'react'
import MassageDescriptions from '../../pages/MassageDescriptions'
import RegisterMassageBtn from './RegisterMassageBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const DeepTisueMassage = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><MassageDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/deepTissue.jpg' alt='Deep tissue massage'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Deep tissue massage</h1></div>
          Deep tissue massage is a therapeutic technique that involves 
          the application of firm pressure and slow strokes to target deeper 
          layers of muscles, tendons, and connective tissue. The benefits 
          of deep tissue massage are numerous and can help with a range of 
          conditions. One of the primary benefits of deep tissue massage is 
          its ability to alleviate chronic pain and stiffness in the muscles 
          and joints. It can also help to increase range of motion and flexibility, 
          reduce inflammation and swelling, and improve posture. <br/><br/>
          In addition deep tissue massage can also be effective in reducing stress and 
          promoting relaxation. It has been shown to lower cortisol levels, 
          which are associated with stress, and increase the production of serotonin 
          and oxytocin, which promote feelings of happiness and relaxation. Additionally, 
          deep tissue massage can improve circulation and boost the immune system,
          helping to remove toxins from the body and promote overall health and well-being.
          <h5>Hourly rate for deep tissue massage is XX€/h.</h5>
            <RegisterMassageBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="deepTissue"/></div>
    </div>
  )
}

export default DeepTisueMassage
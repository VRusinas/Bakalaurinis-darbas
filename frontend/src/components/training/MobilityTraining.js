import React from 'react'
import TrainingDescriptions from '../../pages/TrainingDescriptions'
import RegisterTrainingBtn from './RegisterTrainingBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const MobilityTraining = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><TrainingDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/mobility.jpg' alt='mobility training'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Mmobility training</h1></div>
          Mobility training is a type of physical exercise that focuses on 
          improving the body's range of motion and joint flexibility. 
          This type of training has many benefits for the body, including
           reducing the risk of injury, improving posture, and enhancing 
           athletic performance. Mobility training can also help to 
           alleviate pain and stiffness in the joints and muscles, increase
            circulation and oxygenation of the tissues, and promote overall 
            physical balance and coordination. <br/><br/> Additionally, mobility training
            can have positive effects on mental health by reducing stress 
          and promoting relaxation. Regular mobility training can be adapted
           to different fitness levels and goals, making it an effective way
          to improve overall physical health and fitness. However, it's
          important to use proper form and gradually increase intensity
            to avoid injury. Overall, incorporating mobility training into
           your regular exercise routine can lead to significant 
          improvements in physical and mental well-being.
          <h5>Hourly rate for this activity is XX€/h.</h5>
            <RegisterTrainingBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="mobilityTraining"/></div>
    </div>
  )
}

export default MobilityTraining
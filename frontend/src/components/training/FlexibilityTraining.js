import React from 'react'
import TrainingDescriptions from '../../pages/TrainingDescriptions'
import RegisterTrainingBtn from './RegisterTrainingBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const FlexibilityTraining = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><TrainingDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/flexibility.jpg' alt='flexibility'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Flexibility training</h1></div>
          Flexibility training is a type of physical exercise that
           involves stretching and lengthening the muscles to increase 
           their range of motion. This type of training has many benefits 
           for the body, including improving flexibility, balance, and
          posture, reducing the risk of injury, and relieving
          muscle soreness and tension. Flexibility training
          can also improve athletic performance by increasing 
          the efficiency of movement and reducing the risk of muscle 
          strain or tear.<br/><br/> Additionally, flexibility training can
          have positive effects on mental health by reducing 
          stress and promoting relaxation. Regular flexibility
          training can help people of all ages and fitness 
          levels to maintain mobility and physical independence.
          Overall, incorporating flexibility training into your 
           regular exercise routine can lead to significant 
          improvements in physical and mental well-being.
          <h5>Hourly rate for this activity is XX€/h.</h5>
            <RegisterTrainingBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="flexibilityTraining"/></div>
    </div>
  )
}

export default FlexibilityTraining
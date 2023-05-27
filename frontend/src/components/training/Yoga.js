import React from 'react'
import TrainingDescriptions from '../../pages/TrainingDescriptions'
import RegisterTrainingBtn from './RegisterTrainingBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const Yoga = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><TrainingDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/yoga.jpg' alt='Yoga'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Yoga</h1></div>
          Yoga is a type of physical exercise that involves stretching, breathing, 
          and meditation to promote physical, mental, and spiritual well-being. 
          This type of exercise has many benefits for the body, including increasing 
          flexibility, strength, and balance, improving posture and alignment, 
          and reducing the risk of injury. Yoga can also help to reduce stress a
          nd promote relaxation, improve cardiovascular health, and boost the 
          immune system.<br/><br/> Additionally, yoga has been shown to be effective in 
          managing chronic conditions such as anxiety, depression, and chronic 
          pain. Regular yoga practice can be adapted to different fitness levels 
          and goals, making it an accessible and effective way to improve overall 
          physical and mental health. Overall, incorporating yoga into your regular 
          exercise routine can lead to significant improvements in physical and mental 
          well-being.
          <h5>Hourly rate for this activity is XX€/h.</h5>
            <RegisterTrainingBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="yoga"/></div>
    </div>
  )
}

export default Yoga
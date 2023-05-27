import React from 'react'
import TrainingDescriptions from '../../pages/TrainingDescriptions'
import RegisterTrainingBtn from './RegisterTrainingBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const Aerobics = () => {
  return (
    <div className='activity-main-container '> 
      <div className='choice-nav'><TrainingDescriptions/></div>

      <div className='descriptions'>
          <div className='descriptions-image'>
            <img className='dec-img' src='/images/aerobics.jpg' alt='aerobics'></img>
          </div>
          <div className='descriptions-text'>
          <div className='name'><h1>Aerobics</h1></div>
              Aerobics is a type of physical exercise that involves rhythmic
            movements of large muscle groups and increases the heart rate,
            breathing rate, and oxygen consumption. This type of exercise
            has many benefits for the body, including improving cardiovascular 
            health, reducing the risk of chronic diseases such as diabetes and high
            blood pressure, boosting the immune system, improving mental health
            and mood, and promoting weight loss.<br/><br/> Aerobics also increases 
            endurance and stamina, improves balance and coordination, and can
            be a great way to socialize and meet new people through group
            exercise classes. Overall, incorporating aerobics into your
            regular exercise routine can lead to significant improvements 
            in physical and mental health.
            <h5>Hourly rate for this activity is XX€/h.</h5>
            <RegisterTrainingBtn/>
          </div>
  
       </div>

      <div className='activity-comment-section'><CommentSection pageId="aerobics"/></div>
    </div>
  )
}

export default Aerobics
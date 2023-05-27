import React from 'react'
import TrainingDescriptions from '../../pages/TrainingDescriptions'
import RegisterTrainingBtn from './RegisterTrainingBtn'
import CommentSection from '../CommentSection'
import "../../styles/global.css"
import "../../styles/activityDescriptions.css"

const WeightTraining = () => {
  return (
    <div className='activity-main-container '> 
    <div className='choice-nav'><TrainingDescriptions/></div>

    <div className='descriptions'>
        <div className='descriptions-image'>
          <img className='dec-img' src='/images/weightlifting.jpg' alt='weight training'></img>
        </div>
        <div className='descriptions-text'>
        <div className='name'><h1>Weight training</h1></div>
        Weight training is a type of physical exercise that involves
        using weights or resistance to build strength and muscle mass.
        This type of training has many benefits for the body,
        including increasing bone density, improving body composition 
        by reducing body fat and increasing muscle mass, improving cardiovascular 
        health, and increasing metabolism. Weight training can also improve
        athletic performance by increasing power, speed, and agility.
        <br/><br/>Additionally, weight training can have positive 
        effects on mental health by boosting self-esteem, reducing stress, 
        and improving mood. Regular weight training can be adapted to 
        different fitness levels and goals, making it an effective way to 
        improve overall physical health and fitness. However, it's important 
        to use proper form and gradually increase weight and intensity to 
        avoid injury. Overall, incorporating weight training into your regular 
        exercise routine can lead to significant improvements in physical and 
        mental well-being.
        <h5>Hourly rate for this activity is XX€/h.</h5>
          <RegisterTrainingBtn/>
        </div>

     </div>

      <div className='activity-comment-section'><CommentSection pageId="weightTraining"/></div>
    </div>
  )
}

export default WeightTraining
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/specialists.css"
import "../../styles/grid.css"
import "../../styles/global.css"

const ipsumText = `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit. Sed nec mi vel ante 
semper lacinia a a sem. Quisque vitae fringilla est. 
Nulla facilisi. Pellentesque semper sapien a lacinia 
venenatis. In hac habitasse platea dictumst. Suspendisse
mollis arcu quis leo ultricies, eget vestibulum mauris 
ultricies. Maecenas faucibus sapien ut elit
eleifend lobortis.
Sed gravida sapien eget
ipsum venenatis pulvinar. Donec congue purus
vel finibus vestibulum. Nulla facilisi. Curabitur luctus 
vestibulum bibendum. Sed vel mauris ante. Nunc laoreet 
viverra nisl. Vivamus aliquet luctus ullamcorper.
`
const MessageTherapists = [
  {
    name: 'Simon Simons',
    type: 'Massage Therapist',
    bodyPart: ["Sports massage", "Hot stone massage", "Deep Tissue massage",],
    description: ipsumText,
    imageSrc: '/images/Simon Simons.jpg',
  },
  {
    name: 'Tod Todson',
    type: 'Massage Therapist',
    bodyPart: ["Hot stone massage", "Lymphatic drainage massage", "Sports massage"],
    description: ipsumText,
    imageSrc: '/images/Tod Todson.jpg',
  },
  {
    name: 'Martha Martin',
    type: 'Massage Therapist',
    bodyPart: ["Hot stone massage", "Pressure point massage"],
    description: ipsumText,
    imageSrc: '/images/Martha Martin.jpg',
  },
  {
    name: 'Anna Lee',
    type: 'Physiotherapist',
    bodyPart: ["Sports physiotherapy ", "Orthopedic pshysiotherapy"],
    description: ipsumText,
    imageSrc: '/images/Anna Lee.jpg',
  },
  {
    name: 'David Kim',
    type: 'Physiotherapist',
    bodyPart: ["Dry needling physiotherapy"],
    description: ipsumText,
    imageSrc: '/images/David Kim.jpg',
  },
  {
    name: 'James Smith',
    type: 'Trainer',
    bodyPart: ["Flexibility training", "Mobility training", "Weight training", ],
    description: ipsumText,
    imageSrc: '/images/James Smith.jpg',
  },
  {
    name: 'Jhon doe',
    type: 'Trainer',
    bodyPart: ["Aerobics", "Flexibility training", "Mobility training"],
    description: ipsumText,
    imageSrc: '/images/Jhon Doe.jpg',
  },
  {
    name: 'Judith Tomson',
    type: 'Trainer',
    bodyPart: ["Mobility training", "Weight training"],
    description: ipsumText,
    imageSrc: '/images/Judith Tomson.jpg',
  },
  {
    name: 'Catie Carlson',
    type: 'Trainer',
    bodyPart: ["Flexibility training", "Yoga"],
    description: ipsumText,
    imageSrc: '/images/Catie Carlson.jpg',
  },
  {
    name: 'Tom Bobson',
    type: 'Trainer',
    bodyPart: [ "Flexibility training","Mobility training" ,"Weight training", ],
    description: ipsumText,
    imageSrc: '/images/Tom Bobson.jpg',
  },
  {
    name: 'Jhon Jhonson',
    type: 'Trainer',
    bodyPart: ["Flexibility training","Weight training"],
    description: ipsumText,
    imageSrc: '/images/Jhon Jhonson.jpg',
  },
  {
    name: 'Jack Denum',
    type: 'Trainer',
    bodyPart: ["Aerobics", "Yoga"],
    description: ipsumText,
    imageSrc: '/images/Jack Denum.jpg',
  },
  {
    name: 'Wiliam Dame',
    type: 'Trainer',
    bodyPart: ["Aerobics","Flexibility training"],
    description: ipsumText,
    imageSrc: '/images/Wiliam Dame.jpg',
  },
];

const Specialists = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const handleClick = (itemName) => {
    navigate(`/specialists/${itemName}`, { state: { itemName } });
  };

  const filteredTherapists = MessageTherapists.filter((therapist) => {
    const filterLower = filter.toLowerCase();
    const nameLower = therapist.name.toLowerCase();
    const bodyPartLower = therapist.bodyPart.map((part) => part.toLowerCase()).join();
    const typeLower = therapist.type.toLowerCase();
    return (
      (filter === '' || nameLower.includes(filterLower) || bodyPartLower.includes(filterLower)) &&
      (typeFilter === '' || typeLower === typeFilter.toLowerCase())
    );
  });

  return (
    <div className='specialist-container fade-in'>
      <div className='specialist-nav'>
        <input className='specialist-nav-filter'  type="text" placeholder="Type in to filter specialists" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <button className='specialist-nav-button' onClick={() => setTypeFilter('')}>All specialists</button>
        <button className='specialist-nav-button' onClick={() => setTypeFilter('Massage Therapist')}>Massage Therapists</button>
        <button className='specialist-nav-button' onClick={() => setTypeFilter('Trainer')}>Trainers</button>
        <button className='specialist-nav-button' onClick={() => setTypeFilter('Physiotherapist')}>Physiotherapists</button>
      </div>
      <div className="grid-container">
        {filteredTherapists.map((item) => (
          <div key={item.name} className="grid-item " onClick={() => handleClick(item.name)}>
            <h3>{item.name}</h3>
            <div>
              <img className='img-container-small' src={item.imageSrc} alt="profilePicture"/>
            </div>
            <p>{item.bodyPart.map((part, index) => <span key={index}>{part}<br /></span>)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ItemDetails = () => {
  const { itemName } = useParams();
  const selectedItem = MessageTherapists.find((item) => item.name === itemName);

  return (
    <div className='main-item-details-container fade-in'>
      <div className="item-details-container fade-in">
        <div className='image-box'>
          <img className='img-container-normal' src={selectedItem.imageSrc} alt={selectedItem.name} />
        </div>
        <div className='text-box'>
          <h2>Hi! My name is {selectedItem.name}</h2><br/><br/>
          <h2>I specialize in: </h2><span>{selectedItem.bodyPart.map((part, index) => <p key={index}>{part} </p>)}</span><br/><br/>
          <h2>About me: </h2><p>{selectedItem.description}</p><br/><br/>
          <h2>Hope to see you soon!</h2>

        </div>
      </div>
    </div>
  );
};

export {ItemDetails, Specialists};
export default Specialists;

import React, { useState } from 'react';
import './Form.css';

const Form = (props) => {
  //Props
  const { selectedItem } = props;

  //State Variables
  const [name, setName] = useState(selectedItem.name ? selectedItem.name : '');
  const [title, setTitle] = useState(
    selectedItem.title ? selectedItem.title : '',
  );
  const [gender, setGender] = useState(
    selectedItem.gender ? selectedItem.gender : '',
  );
  const [image, setImage] = useState(selectedItem.img ? selectedItem.img : '');
  const [spouse, setSpouse] = useState(
    selectedItem.spouse ? selectedItem.spouse : [],
  );
  const [children, setChildren] = useState(
    selectedItem.children ? selectedItem.children : [],
  );

  const [img, setImg] = useState(selectedItem.img ? selectedItem.img : '');

  // console.log(selectedItem);
  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Title:', title);
    console.log('Gender:', gender);
    console.log('Image:', image);
  };

  return (
    <form
      className='form'
      onSubmit={handleSubmit}>
      <div className='form-header'>
        <h1>{name} </h1>
        <img
          src={`./Resources/${img}.png`}
          alt={img}
        />
      </div>
      <div>
        <div>
          <label>Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input
              type='radio'
              value='male'
              checked={gender === 'male'}
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label>
            <input
              type='radio'
              value='female'
              checked={gender === 'female'}
              onChange={handleGenderChange}
            />
            Female
          </label>
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        {/* {gender === 'female' && (
        <div>
          <label>Husband Name:</label>
          <input
            type='text'
            value={husbandName}
            onChange={(e) => setHusbandName(e.target.value)}
          />
        </div>
      )}
      {gender === 'male' && (
        <div>
          <label>Wife Name:</label>
          <input
            type='text'
            value={wifeName}
            onChange={(e) => setWifeName(e.target.value)}
          />
        </div>
      )} */}
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default Form;

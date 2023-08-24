import React, { useState, useEffect } from 'react';
import './Form.css';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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
  const [formSwap, setFormSwap] = useState(false);

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };

  useEffect(() => {
    setName(selectedItem.name);
    selectedItem.title ? setTitle(selectedItem.title) : setTitle('');
    setGender(selectedItem.gender);
    selectedItem.image && setImage(selectedItem.image);
    selectedItem.spouse && setSpouse(selectedItem.spouse);
    selectedItem.img && setImage(selectedItem.img);
    selectedItem.children && setChildren(selectedItem.children);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEdit = () => {
    setFormSwap(!formSwap);
  };

  return (
    <form
      className='form'
      onSubmit={handleSubmit}>
      <div className='header-container'>
        <div className={`form-header${gender === 'female' ? ' female' : ''}`}>
          <div className='hearder-name'>
            <h1 className='name'>{name}</h1>
            <div className='close-icon'>
              <CloseIcon />
            </div>
          </div>
          <img
            className='header-image'
            src={`./Resources/${image}.png`}
            alt={image}
          />
        </div>
        <div className='header-button'>
          <button
            className='edit-button'
            onClick={handleEdit}>
            <ModeEditIcon />
          </button>
        </div>
      </div>
      <div>
        {formSwap ? (
          <div className='input-form'>
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
        ) : (
          <div className='display-form'>
            <div>
              <label>Name</label>
              <div>{name}</div>
            </div>
            {title && (
              <div>
                <label>Title</label>
                <div>{title}</div>
              </div>
            )}
            <div>
              <label>Image</label>
              <div>{image}</div>
            </div>
            <div>
              <label>Gender</label>
              <div>{gender}</div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default Form;

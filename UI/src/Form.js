import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Form = (props) => {
  //Props
  const { selectedItem, handleClick, handleSubmit, fetchData } = props;

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
  const [addElement, setAddElement] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };

  const id = selectedItem.id;
  const mid = selectedItem.mid ? selectedItem.mid : null;
  const fid = selectedItem.fid ? selectedItem.fid : null;

  useEffect(() => {
    setName(selectedItem.name);
    selectedItem.title ? setTitle(selectedItem.title) : setTitle('');
    setGender(selectedItem.gender);
    selectedItem.image && setImage(selectedItem.image);
    selectedItem.spouse && setSpouse(selectedItem.spouse);
    selectedItem.img && setImage(selectedItem.img);
    selectedItem.children && setChildren(selectedItem.children);
  }, [selectedItem]);

  const handleSubmitt = (event) => {
    event.preventDefault();
    const data = {
      id: selectedItem.id,
      name: name,
      gender: gender,
      spouse: spouse,
      img: image,
      title: title,
      children: children,
      mid: mid,
      fid: fid,
    };
    setFormSwap(!formSwap);
    handleSubmit(data);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleEdit = () => {
    setFormSwap(!formSwap);
  };

  const handleDelete = (itemId) => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this item?',
    );

    if (shouldDelete) {
      axios
        .delete(`http://localhost:3005/delete/${itemId}`)
        .then(() => {
          fetchData(); // Fetch updated data after successful DELETE
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const handleAdd = () => {
    setAddElement(true);
  };

  return (
    <div className='form'>
      <div className='header-container'>
        <div className={`form-header${gender === 'female' ? ' female' : ''}`}>
          <div className='hearder-name'>
            <h1 className='name'>{name}</h1>
            <div className='close-icon'>
              <CloseIcon
                fontSize='large'
                onClick={handleClick}
              />
            </div>
          </div>
          <img
            className='header-image'
            src={`./Resources/${image}.png`}
            alt={image}
          />
        </div>
        <div className='header-button'>
          {formSwap ? (
            <div>
              <button
                className='edit-button'
                onClick={() => {
                  handleDelete(id);
                }}>
                <DeleteIcon fontSize='large' />
              </button>
              <button
                className='edit-button'
                onClick={handleAdd}>
                <AddIcon fontSize='large' />
              </button>
              {addElement && (
                <div>
                  <label>
                    <input
                      type='radio'
                      value='Child'
                      checked={selectedOption === 'Child'}
                      onChange={handleOptionChange}
                    />
                    Child
                  </label>
                  <label>
                    <input
                      type='radio'
                      value='Spouse'
                      checked={selectedOption === 'Spouse'}
                      onChange={handleOptionChange}
                    />
                    Spouse
                  </label>
                </div>
              )}
            </div>
          ) : (
            <button
              className='edit-button'
              onClick={handleEdit}>
              <ModeEditIcon fontSize='large' />
            </button>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmitt}>
        {formSwap ? (
          <div className='input-form'>
            <div>
              <label>Name:</label>
              <input
                type='text'
                id='name'
                required
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
      </form>
    </div>
  );
};

export default Form;

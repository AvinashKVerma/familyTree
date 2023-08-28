import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddForm from './AddForm';

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
  const [formSwap, setFormSwap] = useState(false);
  const [addElement, setAddElement] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); //Selection Option For Child or Spouse

  // const id = selectedItem.id;

  useEffect(() => {
    setName(selectedItem.name);
    setGender(selectedItem.gender);
    selectedItem.title ? setTitle(selectedItem.title) : setTitle('');
    selectedItem.image && setImage(selectedItem.image);
    selectedItem.img && setImage(selectedItem.img);
  }, [selectedItem]);

  //Event Handlers

  const handleAdd = () => {
    setAddElement(true);
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this item?',
    );

    if (shouldDelete) {
      axios
        .put(`http://localhost:3005/delete/${selectedItem.id}`)
        .then((response) => {
          console.log('User updated successfully:', response.data);
          fetchData();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };

  return (
    <div className='form'>
      <div className='header-container'>
        <div className={`form-header${gender === 'female' ? ' female' : ''}`}>
          <div className='hearder-name'>
            <div>
              <h1 className='name'>{name}</h1>
              <div className='close-icon'>
                <CloseIcon
                  fontSize='large'
                  onClick={handleClick}
                />
              </div>
              <div>
                <h2>{title}</h2>
              </div>
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
                onClick={handleDelete}>
                <DeleteIcon fontSize='large' />
              </button>
              <button
                className='edit-button'
                onClick={handleAdd}>
                <AddIcon fontSize='large' />
              </button>
              {addElement && (
                <div>
                  {selectedItem.spouse.length > 1 && (
                    <div>
                      <label>
                        <input
                          type='radio'
                          value='Child'
                          checked={selectedOption === 'Child'}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        Child
                      </label>
                      <label>
                        <input
                          type='radio'
                          value='Spouse'
                          checked={selectedOption === 'Spouse'}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        Spouse
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              className='edit-button'
              onClick={() => setFormSwap(!formSwap)}>
              <ModeEditIcon fontSize='large' />
            </button>
          )}
        </div>
      </div>
      <AddForm
        selectedItem={selectedItem}
        handleSubmit={handleSubmit}
        formSwap={formSwap}
        setFormSwap={setFormSwap}
        addElement={addElement}
        selectedOption={selectedOption}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Form;

import React, { useState, useEffect } from 'react';
import './Form.css';

const AddForm = (props) => {
  const { selectedItem, handleSubmit, setFormSwap, formSwap } = props;

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

  const mid = selectedItem.mid ? selectedItem.mid : null;
  const fid = selectedItem.fid ? selectedItem.fid : null;

  useEffect(() => {
    setName(selectedItem.name);
    setGender(selectedItem.gender);
    selectedItem.title ? setTitle(selectedItem.title) : setTitle('');
    selectedItem.image && setImage(selectedItem.image);
    selectedItem.spouse && setSpouse(selectedItem.spouse);
    selectedItem.img && setImage(selectedItem.img);
    selectedItem.children && setChildren(selectedItem.children);
  }, [selectedItem]);

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };

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
  return (
    <div>
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

export default AddForm;

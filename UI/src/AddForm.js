import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const AddForm = (props) => {
  const {
    selectedItem,
    handleSubmit,
    setFormSwap,
    formSwap,
    addElement,
    selectedOption,
    fetchData,
  } = props;

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
  const [newMId, setNewMId] = useState('');
  const [newFId, setNewFId] = useState('');

  useEffect(() => {
    if (addElement) {
      setName('');
      setTitle('');
      setGender('');
      setImage('');
    } else {
      setName(selectedItem.name);
      setGender(selectedItem.gender);
      selectedItem.title ? setTitle(selectedItem.title) : setTitle('');
      selectedItem.image && setImage(selectedItem.image);
      selectedItem.spouse && setSpouse(selectedItem.spouse);
      selectedItem.img && setImage(selectedItem.img);
      selectedItem.children && setChildren(selectedItem.children);
    }
  }, [selectedItem, addElement]);

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
    addElement ? handleNewNode(data) : handleSubmit(data);
  };

  const handleNewNode = () => {
    if (selectedOption === 'Child') {
      if (selectedItem.gender === 'male') {
        setNewFId(selectedItem.id);
        if (selectedItem.spouse.length < 2) {
          setNewMId(selectedItem.spouse[0].id);
        }
      }
      if (selectedItem.gender === 'female') {
        setNewMId(selectedItem.id);
        if (selectedItem.spouse.length < 2) {
          setNewFId(selectedItem.spouse[0].id);
        }
      }
    } else {
      console.log('==========>');
      const newData = {
        name: name,
        img: image,
        gender: gender,
        mid: null,
        fid: null,
        title: title,
      };
      axios
        .post('http://localhost:3005/users', newData)
        .then((response) => {
          fetchData(); // Fetch updated data after successful POST
        })
        .catch((err) => {
          console.log(err.message);
        });

      axios
        .put(`http://localhost:3005/spouse/${selectedItem.id}`)
        .then((response) => {
          console.log('User updated successfully:', response.data);
          fetchData();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };
  // eslint-disable-next-line
  useEffect(() => {
    if (selectedOption === 'Child') {
      if (newMId !== '' && newFId !== '') {
        // Create the new data object
        const newData = {
          name: name,
          img: image,
          gender: gender,
          mid: newMId,
          fid: newFId,
          title: title,
        };

        axios
          .post('http://localhost:3005/users', newData)
          .then((response) => {
            fetchData(); // Fetch updated data after successful POST
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }, [newFId, newMId, gender, image, name, spouse, title]);

  return (
    <div>
      <form onSubmit={handleSubmitt}>
        {formSwap ? (
          <div className='input-form'>
            {selectedOption === 'Child' &&
              selectedItem.spouse &&
              (() => {
                if (selectedItem.spouse.length > 1) {
                  return selectedItem.spouse.length > 1
                    ? selectedItem.gender === 'male' && (
                        <div>
                          <label>Mother</label>
                          {selectedItem.spouse !== null &&
                            selectedItem.spouse.map((ele) => {
                              return (
                                <label key={ele.id}>
                                  <input
                                    type='radio'
                                    value={ele.name}
                                    checked={newMId === ele.id}
                                    onChange={(e) => setNewMId(ele.id)}
                                  />
                                  {ele.name}
                                </label>
                              );
                            })}
                        </div>
                      )
                    : selectedItem.gender === 'female' && (
                        <div>
                          <label>Father</label>
                          {selectedItem.spouse.map((ele) => {
                            return (
                              <label key={ele.id}>
                                <input
                                  type='radio'
                                  value={ele.name}
                                  checked={newFId === ele.id}
                                  onChange={(e) => setNewFId(ele.id)}
                                />
                                {ele.name}
                              </label>
                            );
                          })}
                        </div>
                      );
                } else {
                  return null;
                }
              })()}
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

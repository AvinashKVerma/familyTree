import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Tree.css';
import axios from 'axios';

const Tree = (props) => {
  const { handleForm } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:3005/testdata')
      .then((response) => {
        setData(response.data); // Assuming the server returns an array
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const selectRelation = (relationType) => {
    handleForm(selectedItem.id, relationType);
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <div className='tree'>{treeRendering(data, handleItemClick)}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Select Relation'>
        <div>Select relation:</div>
        <button onClick={() => selectRelation('child')}>Child</button>
        <button onClick={() => selectRelation('spouse')}>Spouse</button>
      </Modal>
    </div>
  );
};

const treeRendering = (treeData, handleItemClick) => {
  return (
    <ul>
      {treeData.map((item) => (
        <React.Fragment key={item.id}>
          <li className={item.name + item.id}>
            <div onClick={() => handleItemClick(item)}>
              <img
                src={`./Resources/${item.img}.png`}
                alt={item.img}
              />
              {item.name}
              <br />
              {item.title && item.title}
            </div>
            {item.children && item.children.length
              ? treeRendering(item.children, handleItemClick)
              : ''}
          </li>
          <li key={item.spouse && item.spouse.id}>
            {item.spouse && (
              <>
                <div
                  className='spouse'
                  onClick={() => handleItemClick(item.spouse)}>
                  <img
                    src={`./Resources/${item.spouse.img}.png`}
                    alt={item.img}
                  />
                  {item.spouse.name}
                </div>
              </>
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default Tree;

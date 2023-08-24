import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import build_family_tree from './data';
import PersonNode from './PersonNode';
import Form from './Form';

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(false);
  const [formInput, setFormInput] = useState({});

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

  const rootPersonId = 1; // Change this to the appropriate root person's ID
  const familyTree = build_family_tree(data, rootPersonId);

  const handleClick = (input) => {
    setForm(true);
    setFormInput(input);
  };
  return (
    <div className='App'>
      <div className='display-Tree'>
        {familyTree && (
          <ul>
            <PersonNode
              person={familyTree}
              handleClick={handleClick}
            />
          </ul>
        )}
      </div>
      {form && (
        <div className='form-container'>
          <Form selectedItem={formInput} />
        </div>
      )}
    </div>
  );
}

export default App;

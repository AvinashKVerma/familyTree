import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import build_family_tree from './data';
import PersonNode from './PersonNode';

function App() {
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

  const rootPersonId = 1; // Change this to the appropriate root person's ID
  const familyTree = build_family_tree(data, rootPersonId);

  return (
    <div className='App'>
      {familyTree && (
        <ul>
          <PersonNode
            person={familyTree}
            familyTree={familyTree} // Pass familyTree prop here
          />
        </ul>
      )}
    </div>
  );
}

export default App;

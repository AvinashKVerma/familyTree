import React from 'react';
import './PersonNode.css'; // Import your CSS file

function PersonNode({ person }) {
  const renderPerson = (person) => {
    if (!person) {
      return null;
    }

    const spouse = person.spouse;
    const children = person.children;

    return (
      <div className='person-node'>
        <div className='person-details'>
          <div className='person-name'>{person.name}</div>
          <div className='person-gender'>{person.gender}</div>
        </div>
        {spouse && (
          <div className='spouse-details'>
            <div className='spouse-name'>{spouse.name}</div>
            <div className='spouse-gender'>{spouse.gender}</div>
          </div>
        )}
        <ul className='children'>
          {children.map((child) => (
            <PersonNode
              key={child.id}
              person={child}
            />
          ))}
        </ul>
      </div>
    );
  };

  return <li className='tree'>{renderPerson(person)}</li>;
}

export default PersonNode;

import React from 'react';
import './PersonNode.css'; // Import your CSS file

function PersonNode({ person, handleClick }) {
  const renderPerson = (person) => {
    if (!person) {
      return null;
    }

    const spouse = person.spouse;
    const children = person.children;

    return (
      <div className='person-node'>
        <div className='parent'>
          <div className='person-details'>
            <div
              onClick={() => handleClick(person)}
              className={`circle-container${
                person.gender === 'male' ? '' : ' female'
              }`}>
              <img
                className='circle-image'
                src={`./Resources/${person.img}.png`}
                alt={person.img}
              />
            </div>
            <div className='person-name'>{person.name}</div>
            <div className='person-gender'>{person.title}</div>
          </div>
          {spouse &&
            spouse.map((ele) => {
              return (
                <div
                  key={ele.id}
                  className='spouse-details'>
                  <div
                    onClick={() => handleClick(ele)}
                    className={`circle-container${
                      ele.gender === 'male' ? '' : ' female'
                    }`}>
                    <img
                      className='circle-image'
                      src={`./Resources/${ele.img}.png`}
                      alt={ele.img}
                    />
                  </div>
                  <div className='spouse-name'>{ele.name}</div>
                  <div className='spouse-gender'>{ele.title}</div>
                </div>
              );
            })}
        </div>
        <ul className='children'>
          {children.map((child) => (
            <PersonNode
              key={child.id}
              person={child}
              handleClick={handleClick}
            />
          ))}
        </ul>
      </div>
    );
  };

  return <li className='tree'>{renderPerson(person)}</li>;
}

export default PersonNode;

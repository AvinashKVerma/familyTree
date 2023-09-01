import React from 'react';
import './PersonNode.css'; // Import your CSS file

function PersonNode({ person, handleClick }) {
  const renderPerson = (person) => {
    if (!person) {
      return null;
    }

    const handleSelect = (ele) => {
      handleClick(ele);
    };

    const spouse = person.spouse;
    const children = person.children;

    return (
      <div>
        {person.display === true && (
          <div className='person-node'>
            {person.display === true && (
              <div className='parent'>
                <div className={`Personnn Person-${person.id}`}>
                  <div className='person-details'>
                    <div className='bottom-line'></div>

                    <div
                      onClick={() => handleSelect(person)}
                      className={`circle-container${
                        person.gender === 'male' ? '' : ' female'
                      }`}>
                      <div className='circle-image'>
                        <img
                          src={`./Resources/${person.img}.png`}
                          alt={person.img}
                        />
                      </div>
                    </div>
                    <div className='person-name'>{person.name}</div>
                    <div className='person-gender'>{person.title}</div>
                  </div>
                  {spouse &&
                    spouse.map((ele) => {
                      return (
                        ele.display && (
                          <div
                            key={ele.id}
                            className='spouse-details'>
                            <div
                              onClick={() => handleSelect(ele)}
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
                        )
                      );
                    })}
                </div>
              </div>
            )}
            <div
              className={`${
                person.children && person.children.length >= 1 ? 'top-line' : ''
              }`}></div>
            <ul className={`children ${person.spouse && 'spouse-hogaya'}`}>
              <div className={`Childrennn Children-${person.id}`}>
                {children.map(
                  (child) =>
                    child.display && (
                      <div
                        key={child.id}
                        className='connection-line'>
                        <PersonNode
                          person={child}
                          handleClick={handleClick}
                        />
                      </div>
                    ),
                )}
              </div>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return <li className='tree'>{renderPerson(person)}</li>;
}

export default PersonNode;

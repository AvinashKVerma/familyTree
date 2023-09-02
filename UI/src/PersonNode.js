import React from 'react';
import './PersonNode.css'; // Import your CSS file

function PersonNode({ person, handleClick }) {
  const spouse = person.spouse;
  const children = person.children;
  const renderPerson = (person) => {
    if (!person) {
      return null;
    }

    const handleSelect = (ele) => {
      handleClick(ele);
    };

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
            <div className={`children ${person.spouse && 'spouse-present'}`}>
              <div className={`Childrennn Children-${person.id}`}>
                {children.map(
                  (child) =>
                    child.display && (
                      <div
                        className='siblings'
                        key={child.id}>
                        <div
                          style={
                            child.spouse.filter((ele) => ele.display).length >
                              0 && child.id !== children[children.length - 1].id
                              ? {
                                  borderTop: '1px solid #dcdcdc',
                                  position: 'relative',
                                  top: '-40px',
                                  left: `calc(${
                                    100 / ((child.spouse.length + 1) * 2)
                                  }% + -6px)`,
                                }
                              : {} // Empty object for no styles when the condition is false
                          }
                          className={`connection-line${
                            child.id !== children[children.length - 1].id
                              ? child.spouse.filter((ele) => {
                                  if (ele.display) {
                                    return ele.display;
                                  }
                                }).length > 0
                                ? `-with-spouse`
                                : ''
                              : child.spouse.filter((ele) => {
                                  if (ele.display) {
                                    return ele.display;
                                  }
                                }).length > 0 && '-last'
                          }`}></div>
                        <PersonNode
                          person={child}
                          handleClick={handleClick}
                        />
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return <div className='tree'>{renderPerson(person)}</div>;
}

export default PersonNode;

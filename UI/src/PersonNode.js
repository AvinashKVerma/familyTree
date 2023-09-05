// import React, { useState } from 'react';
// import './PersonNode.css'; // Import your CSS file

// function PersonNode({ person, handleClick }) {
//   const spouse = person.spouse;
//   const children = person.children;
//   const [lastChild, setLastChild] = useState('');
//   const renderPerson = (person) => {
//     if (!person) {
//       return null;
//     }

//     const handleSelect = (ele) => {
//       handleClick(ele);
//     };

//     // person.children.length > 0 &&

//     return (
//       <div>
//         {person.display === true && (
//           <div className='person-node'>
//             {person.display === true && (
//               <div className='parent'>
//                 <div className={`Personnn Person-${person.id}`}>
//                   <div className='person-details'>
//                     <div className='bottom-line'></div>
//                     <div
//                       onClick={() => handleSelect(person)}
//                       className={`circle-container${
//                         person.gender === 'male' ? '' : ' female'
//                       }`}>
//                       <div className='circle-image'>
//                         <img
//                           src={`./Resources/${person.img}.png`}
//                           alt={person.img}
//                         />
//                       </div>
//                     </div>
//                     <div className='person-name'>{person.name}</div>
//                     <div className='person-gender'>{person.title}</div>
//                   </div>
//                   {spouse &&
//                     spouse.map((ele) => {
//                       return (
//                         ele.display && (
//                           <div
//                             key={ele.id}
//                             className='spouse-details'>
//                             <div
//                               onClick={() => handleSelect(ele)}
//                               className={`circle-container${
//                                 ele.gender === 'male' ? '' : ' female'
//                               }`}>
//                               <img
//                                 className='circle-image'
//                                 src={`./Resources/${ele.img}.png`}
//                                 alt={ele.img}
//                               />
//                             </div>
//                             <div className='spouse-name'>{ele.name}</div>
//                             <div className='spouse-gender'>{ele.title}</div>
//                           </div>
//                         )
//                       );
//                     })}
//                 </div>
//               </div>
//             )}
//             <div
//               className={`${
//                 person.children && person.children.length >= 1 ? 'top-line' : ''
//               }`}></div>
//             <div className={`children ${person.spouse && 'spouse-present'}`}>
//               <div className={`Childrennn Children-${person.id}`}>
//                 {children.map(
//                   (child) =>
//                     child.display && (
//                       <div
//                         className='siblings'
//                         key={child.id}>
//                         <div
//                           style={
//                             child.spouse.filter((ele) => ele.display).length >
//                               0 && child.id !== children[children.length - 1].id
//                               ? {
//                                   borderTop: '1px solid #dcdcdc',
//                                   position: 'relative',
//                                   top: '-40px',
//                                   left: `calc(${
//                                     100 / ((child.spouse.length + 1) * 2)
//                                   }% + -6px)`,
//                                 }
//                               : {} // Empty object for no styles when the condition is false
//                           }
//                           className={`connection-line${
//                             child.id !== children[children.length - 1].id
//                               ? child.spouse.filter((ele) => {
//                                   if (ele.display) {
//                                     return ele.display;
//                                   }
//                                 }).length > 0
//                                 ? `-with-spouse`
//                                 : ''
//                               : child.spouse.filter((ele) => {
//                                   if (ele.display) {
//                                     return ele.display;
//                                   }
//                                 }).length > 0 && '-last'
//                           }`}></div>
//                         <PersonNode
//                           person={child}
//                           handleClick={handleClick}
//                         />
//                       </div>
//                     ),
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return <div className='tree'>{renderPerson(person)}</div>;
// }

// export default PersonNode;

import React from 'react';
import './PersonNode.css'; // Import your CSS file

function PersonNode({ person, handleClick, isLastChild }) {
  const spouse = person.spouse;
  const childrenn = person.children;

  const children = childrenn.filter((ele) => ele.display === true);

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
                          <div key={ele.id}>
                            <div
                              className={`spouse-details${
                                isLastChild && ele.display
                                  ? ' spouse-details-oflastChild'
                                  : ''
                              }`}>
                              <div
                                onClick={() => handleSelect(ele)}
                                className={`circle-container${
                                  ele.gender === 'male' ? '' : ' female'
                                }`}>
                                <div className='spouse-line'></div>
                                <img
                                  className='circle-image'
                                  src={`./Resources/${ele.img}.png`}
                                  alt={ele.img}
                                />
                              </div>
                              <div className='spouse-name'>{ele.name}</div>
                              <div className='spouse-gender'>{ele.title}</div>
                            </div>
                            <div
                              className={`${
                                person.children && person.children.length >= 1
                                  ? 'top-line'
                                  : ''
                              }`}></div>
                          </div>
                        )
                      );
                    })}
                </div>
              </div>
            )}

            <div className={`children ${person.spouse && 'spouse-present'}`}>
              <div className={`Childrennn Children-${person.id}`}>
                {children.map((child, index) => {
                  if (child.display) {
                    // Check if the current child is the last child at this level
                    const isLast = index === children.length - 1;

                    return (
                      <div
                        className='siblings'
                        key={child.id}>
                        <div
                          style={
                            child.spouse.filter((ele) => ele.display).length >
                              0 &&
                            child.display &&
                            child.id !== children[children.length - 1].id
                              ? {
                                  borderTop: '1px solid #dcdcdc',
                                  position: 'relative',
                                  top: '-40px',
                                  left: `calc(${
                                    100 / ((child.spouse.length + 1) * 2)
                                  }% - -1.5px)`,
                                }
                              : {} // Empty object for no styles when the condition is false
                          }
                          className={`connection-line${
                            child.id !== children[children.length - 1].id
                              ? child.spouse.filter((ele) => ele.display)
                                  .length > 0
                                ? `-with-spouse`
                                : ''
                              : child.spouse.filter((ele) => ele.display)
                                  .length > 0 && 'false'
                          }`}></div>

                        <PersonNode
                          person={child}
                          handleClick={handleClick}
                          isLastChild={isLast}
                        />
                      </div>
                    );
                  } else {
                    return null; // Skip rendering if child is not displayed
                  }
                })}
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

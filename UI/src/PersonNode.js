import React from "react";

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

    const visibleSpouses = spouse?.filter((s) => s.display) || [];

    const leftCount = Math.floor(visibleSpouses.length / 2);
    const leftSpouses = visibleSpouses.slice(0, leftCount);
    const rightSpouses = visibleSpouses.slice(leftCount);

    return (
      <div>
        {person.display === true && (
          <div className="person-node">
            {person.display === true && (
              <div className="parent">
                <div className={`Personnn Person-${person.id}`}>
                  {/* LEFT SPOUSES */}
                  {leftSpouses.map((ele, index) => (
                    <div key={ele.id}>
                      <div className="spouse-details">
                        <div
                          onClick={() => handleSelect(ele)}
                          className={`circle-container${ele.gender === "male" ? "" : " female"} bg-white`}
                        >
                          <div className="spouse-line left-line" />

                          <div className="circle-image">
                            <img src={`./Resources/${ele.img}.png`} alt={ele.img} />
                          </div>
                        </div>

                        <div className="spouse-name">{ele.name}</div>
                        <div className="spouse-title">{ele.title}</div>
                      </div>
                      <div
                        style={
                          spouse.length > 1 && children[0] && children[0].mid === ele.id
                            ? { left: `calc(${100 / (index + 1)}% )` }
                            : {}
                        }
                        className={`${person.children && person.children.length >= 1 ? "top-line" : ""}`}
                      />
                    </div>
                  ))}

                  {/* MAIN PERSON */}
                  <div className="person-details">
                    <div className="bottom-line" />

                    <div
                      onClick={() => handleSelect(person)}
                      className={`circle-container${person.gender === "male" ? "" : " female"} bg-white`}
                    >
                      <div className="circle-image">
                        <img src={`./Resources/${person.img}.png`} alt={person.img} />
                      </div>
                    </div>

                    <div className="bg-white">{person.name}</div>
                    <div className="person-gender">{person.title}</div>
                  </div>

                  {/* RIGHT SPOUSES */}
                  {rightSpouses.map((ele, index) => (
                    <div key={ele.id}>
                      <div className="spouse-details">
                        <div
                          onClick={() => handleSelect(ele)}
                          className={`circle-container${ele.gender === "male" ? "" : " female"} bg-white`}
                        >
                          <div className="spouse-line right-line" />

                          <div className="circle-image">
                            <img src={`./Resources/${ele.img}.png`} alt={ele.img} />
                          </div>
                        </div>

                        <div className="spouse-name">{ele.name}</div>
                        <div className="spouse-title">{ele.title}</div>
                      </div>
                      <div
                        style={
                          spouse.length > 1 && children[0] && children[0].mid === ele.id
                            ? { left: `calc(${100 / (index + 1)}% )` }
                            : {}
                        }
                        className={`${person.children && person.children.length >= 1 ? "top-line" : ""}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={`children ${person.spouse && "spouse-present"}`}>
              <div className={`Childrennn Children-${person.id}`}>
                {children.map((child, index) => {
                  if (child.display) {
                    // Check if the current child is the last child at this level

                    const isLast = index === children.length - 1;

                    const visibleSpouses = child.spouse?.filter((ele) => ele?.display) || [];

                    const hasSpouse = visibleSpouses.length > 0;

                    const showConnection = hasSpouse && child.display && child.id !== children[children.length - 1].id;
                    return (
                      <div className="siblings" key={child.id}>
                        <div
                          style={
                            showConnection
                              ? {
                                  borderTop: "3px solid #dcdcdc",
                                  position: "relative",
                                  top: "-40px",
                                  left: `calc(${100 / ((visibleSpouses.length + 1) * 2)}% + 1px)`,
                                }
                              : undefined
                          }
                          // className={
                          //   children.length > 1
                          //     ? !isLast
                          //       ? `connection-line${
                          //           child.id !== children[children.length - 1].id
                          //             ? hasSpouse
                          //               ? "-with-spouse"
                          //               : ""
                          //             : hasSpouse
                          //               ? "false"
                          //               : ""
                          //         }`
                          //       : ""
                          //     : ""
                          // }
                          className={
                            children.length > 1
                              ? index === 0
                                ? "connection-line right"
                                : isLast
                                  ? "connection-line left"
                                  : "connection-line left right"
                              : "connection-line"
                          }
                        />

                        <PersonNode person={child} handleClick={handleClick} isLastChild={isLast} />
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

  return <div className="tree">{renderPerson(person)}</div>;
}

export default PersonNode;

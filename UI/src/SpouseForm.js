import React from 'react';

const SpouseForm = () => {
  return <div></div>;
};

export default SpouseForm;

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
          <li key={item.wife && item.wife.id}>
            {item.wife && (
              <>
                <div
                  className='spouse'
                  onClick={() => handleItemClick(item.wife)}>
                  <img
                    src={`./Resources/${item.wife.img}.png`}
                    alt={item.img}
                  />
                  {item.wife.name}
                </div>
              </>
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

import React from 'react';
import PersonNode from './PersonNode';

class FamilyTree extends React.Component {
  render() {
    const { familyTree } = this.props;
    return (
      <div className='family-tree'>
        <PersonNode
          person={familyTree[1]}
          familyTree={familyTree}
        />
      </div>
    );
  }
}

export default FamilyTree;

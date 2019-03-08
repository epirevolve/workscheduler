import React from 'react';

import List from '@material-ui/core/List';

import Operator from './Operator';

const operatorList = ({ operators, handleEdit }) => {
    const operatorList = operators.map(x =>
        <Operator key={x.id} operator={x} handleEdit={() => handleEdit(x)} />
    );

    return (
        <List style={{ maxHeight: '76vh', overflowY: 'auto' }}>
            {operatorList}
        </List>
    )
}

export default operatorList;
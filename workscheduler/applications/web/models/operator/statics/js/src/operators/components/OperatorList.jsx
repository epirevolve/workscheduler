import React from 'react';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import Operator from './Operator';

const operatorList = ({ operators, handleEdit }) => {
    const operatorList = [];
    for (let operator of operators) {
        operatorList.push(<Operator key={operator.id} operator={operator} handleEdit={() => handleEdit(operator)} />)
    }

    return (
        <List subheader={<ListSubheader component="div">operator</ListSubheader>}>
            {operatorList}
        </List>
    )
}

export default operatorList;
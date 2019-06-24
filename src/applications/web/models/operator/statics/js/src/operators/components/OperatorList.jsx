import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import Operator from './Operator';

const operatorList = ({ operators, handleEdit }) => (
    <List style={{ maxHeight: '76vh', overflowY: 'auto' }}>
        {operators.map((x, i) => <Operator key={i} operator={x} handleEdit={() => handleEdit(x)} />)}
    </List>
);

operatorList.propTypes = {
    operators: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
};

export default operatorList;
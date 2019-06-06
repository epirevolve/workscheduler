import React from 'react';

import List from '@material-ui/core/List';

import User from './User';

const userList = ({ users, handleEdit }) => (
    <List style={{ maxHeight: '76vh', overflowY: 'auto' }}>
        {users.map((x) => <User key={x.id} user={x} handleEdit={() => handleEdit(x)} />)}
    </List>
);

export default userList;
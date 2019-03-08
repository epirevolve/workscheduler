import React from 'react';

import List from '@material-ui/core/List';

import User from './User';

const userList = ({ users, handleEdit }) => {
    const userList = users.map(x =>
        <User key={x.id} user={x} handleEdit={() => handleEdit(x)} />
    );

    return (
        <List style={{ maxHeight: '76vh', overflowY: 'auto' }}>
            {userList}
        </List>
    )
}

export default userList;
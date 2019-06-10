import React from 'react';

import List from '@material-ui/core/List';

import Team from './Team';

const teamList = ({ teams, handleEdit }) => {
    const teamList = teams.map((x) =>
        <Team key={x.id} team={x} handleEdit={() => handleEdit(x)} />
    );

    return (
        <List style={{ maxHeight: '76vh', overflowY: 'auto' }}>
            {teamList}
        </List>
    );
};

export default teamList;
import React from 'react';

import List from '@material-ui/core/List';

import MainTeam from './MainTeam';

const mainTeamList = ({ mainTeams, handleEdit }) => {
    const mainTeamList = mainTeams.map((x) =>
        <MainTeam key={x.id} mainTeam={x} handleEdit={() => handleEdit(x)} />
    );

    return (
        <List style={{ maxHeight: '76vh', overflowY: 'auto' }}>
            {mainTeamList}
        </List>
    );
};

export default mainTeamList;
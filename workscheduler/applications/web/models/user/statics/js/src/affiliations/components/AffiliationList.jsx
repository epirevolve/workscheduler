import React from 'react';

import List from '@material-ui/core/List';

import Affiliation from './Affiliation';

const affiliationList = ({ affiliations, handleEdit }) => {
    const affiliationList = affiliations.map(x =>
        <Affiliation key={x.id} affiliation={x} handleEdit={() => handleEdit(x)} />
    );

    return (
        <List style={{ maxHeight: '76vh', overflowY: 'auto' }}>
            {affiliationList}
        </List>
    )
}

export default affiliationList;
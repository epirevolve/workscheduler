import React from 'react';
import propTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const operator = ({ operator, handleEdit }) => {
    let ojt = operator.ojt || "";
    if (ojt) ojt = `${ojt.user.name}`;
    return (
        <ListItem button onClick={handleEdit} css={css`
            div { flex: 1; }
        `}>
            <ListItemText primary={operator.user.name} secondary={`main team: ${operator.user.team.name}`} />
            <ListItemText primary="Skills" secondary={`${operator.skills.map((x) => `${x.name} `)}`} />
            {ojt && (<ListItemText primary="Ojt" secondary={`${ojt}`} />)}
        </ListItem>
    );
};

operator.propTypes = {
    operator: propTypes.object.isRequired,
    handleEdit: propTypes.func.isRequired
};

export default operator;
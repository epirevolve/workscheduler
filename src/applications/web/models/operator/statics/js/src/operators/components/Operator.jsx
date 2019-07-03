import React from 'react';
import propTypes from 'prop-types';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const operator = ({ operator, edit }) => {
    const ojt = operator.ojt ? operator.ojt.user.name : "";
    return (
        <ListItem button onClick={edit} css={css('div { flex: 1; }')}>
            <ListItemText primary={operator.user.name} />
            <ListItemText primary={operator.user.team.name} secondary='team' />
            <ListItemText primary={`${operator.skills.map((x) => `${x.name} `)}`} secondary='skills' />
            {ojt && (<ListItemText primary={ojt} secondary='ojt' />)}
        </ListItem>
    );
};

operator.propTypes = {
    operator: propTypes.object.isRequired,
    edit: propTypes.func.isRequired
};

export default operator;
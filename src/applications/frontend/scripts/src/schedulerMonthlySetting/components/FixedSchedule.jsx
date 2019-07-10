import React from 'react';
import propTypes from "prop-types";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { w5, w6, w7 } from "width";
import { txtAlignCenter } from "text-align";

const fixedSchedule = ({ fixedSchedule, edit }) => (
    <ListItem button onClick={edit}>
        <ListItemText primary={fixedSchedule.title} css={w7} />
        <ListItemText primary={fixedSchedule.onFrom} css={w6} />
        <ListItemText primary=' -> ' css={css(w5, txtAlignCenter)} />
        <ListItemText primary={fixedSchedule.onTo} css={w7} />
        <ListItemText primary={fixedSchedule.atFrom} css={w6} />
        <ListItemText primary={fixedSchedule.atTo} css={w6} />
        <ListItemText primary={fixedSchedule.participants.map((x) => x.user.name).join(',  ')} />
    </ListItem>
);

fixedSchedule.propTypes = {
    fixedSchedule: propTypes.object,
    edit: propTypes.func.isRequired,
};

export default fixedSchedule;
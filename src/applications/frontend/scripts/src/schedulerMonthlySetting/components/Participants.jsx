import React from 'react';
import propTypes from "prop-types";

import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import IconButton from '@material-ui/core/IconButton';

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ml3 } from "margin";

import { operators } from "../embededData";

const participants = ({ fixedSchedule, changeParticipant }) => {
    const participantIds = fixedSchedule.participants.map((x) => x.id);
    const operatorList = operators.map((x, i) =>
        <ListItem key={i} button onClick={() => changeParticipant(x)}>
            <Checkbox checked={participantIds.includes(x.id)} tabIndex={-1} disableRipple />
            <ListItemText primary={x.user.name} />
        </ListItem>);
    const participants = fixedSchedule.participants.map((x) =>
        <ListItem key={x.id}>
            <ListItemText primary={x.user.name} />
        </ListItem>);

    const [ state, setState ] = React.useState({ anchorEl: null, expanded: false });
    const isOpen = Boolean(state.anchorEl);
    const changeExpnaded = (event, isExpanded) => {
        setState((prev) => ({ ...prev, expanded: isExpanded ? true : false }));
    };

    return (
        <>
            <Popover open={isOpen} anchorEl={state.anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                onClose={() => setState((prev) => ({ ...prev, anchorEl: null }))}>
                <List subheader={<ListSubheader component="div">operators</ListSubheader>}>
                    {operatorList}
                </List>
            </Popover>
            <ExpansionPanel expanded={state.expanded} onChange={changeExpnaded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ color: 'gray' }}>participants</Typography>
                    <div css={ml3}>
                        <IconButton size="small" onClick={(e) => { setState((prev) => ({ ...prev, anchorEl: e.currentTarget })); e.stopPropagation(); }}>
                            <CheckBoxRoundedIcon />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {participants}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    );
};

participants.propTypes = {
    fixedSchedule: propTypes.object,
    changeParticipant: propTypes.func.isRequired
};

export default participants;
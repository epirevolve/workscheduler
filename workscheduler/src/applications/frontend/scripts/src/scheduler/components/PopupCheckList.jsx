import React from 'react';
import propTypes from "prop-types";

import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mt2, ml3 } from "margin";

const popupCheckList = ({ name, targets, current, changeSelect }) => {
    const currentIds = current.map((x) => x.id);
    const popupList = targets.map((x, i) =>
        <ListItem key={i} button onClick={() => changeSelect(x.obj)}>
            <Checkbox checked={currentIds.includes(x.id)} tabIndex={-1} disableRipple />
            <ListItemText primary={x.name} />
        </ListItem>);
    const currentList = current.map((x, i) =>
        <ListItem key={i}>
            <ListItemText primary={x.name} />
        </ListItem>);

    const [ state, setState ] = React.useState({ anchorEl: null, expanded: false });
    const isOpen = Boolean(state.anchorEl);
    const onExpandedChange = (event, isExpanded) => {
        setState((prev) => ({ ...prev, expanded: isExpanded ? true : false }));
    };

    return (
        <>
            <Popover open={isOpen} anchorEl={state.anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                onClose={() => setState((prev) => ({ ...prev, anchorEl: null }))}>
                <List>
                    {popupList}
                </List>
            </Popover>
            <ExpansionPanel expanded={state.expanded} onChange={onExpandedChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" style={{ color: 'gray' }} css={mt2}>{name}</Typography>
                    <Box css={ml3}>
                        <IconButton size="small" onClick={(e) => { setState((prev) => ({ ...prev, anchorEl: e.currentTarget })); e.stopPropagation(); }}>
                            <CheckBoxRoundedIcon />
                        </IconButton>
                    </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {currentList}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    );
};

popupCheckList.propTypes = {
    name: propTypes.string.isRequired,
    targets: propTypes.array,
    current: propTypes.array,
    changeSelect: propTypes.func.isRequired
};

export default popupCheckList;
import React from 'react';
import propTypes from "prop-types";

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import FixedSchedule from './FixedSchedule';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { mt4, mb3, ml3 } from "margin";

const fixedScheduleList = ({ fixedSchedules, scheduleOf, append, edit }) => {
    const [ state, setState ] = React.useState({ expanded: true });
    const changeExpanded = (event, isExpanded) => {
        setState((prev) => ({ ...prev, expanded: isExpanded ? true : false }));
    };

    return (
        <Box css={css(mt4, mb3)}>
            <ExpansionPanel expanded={state.expanded} onChange={changeExpanded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontSize: '2rem', color: 'gray' }}>fixed schedules</Typography>
                    <Box css={ml3}>
                        <IconButton onClick={(e) => { append(scheduleOf); e.stopPropagation(); }}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {fixedSchedules.map((x, i) => <FixedSchedule key={i} fixedSchedule={x} edit={() => edit(x)} />)}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Box>
    );
};

fixedScheduleList.propTypes = {
    fixedSchedules: propTypes.array,
    scheduleOf: propTypes.string.isRequired,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired,
};

export default fixedScheduleList;
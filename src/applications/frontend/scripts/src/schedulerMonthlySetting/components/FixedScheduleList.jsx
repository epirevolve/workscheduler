import React from 'react';
import propTypes from "prop-types";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FixedSchedule from './FixedSchedule';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { mt4, mb3, mb2, ml3, mr4 } from "margin";

const fixedScheduleList = ({ fixedSchedules, append, ...other }) => {
    const [ state, setState ] = React.useState({ expanded: true });
    const changeExpanded = (event, isExpanded) => {
        setState((prev) => ({ ...prev, expanded: isExpanded ? true : false }));
    };

    return (
        <div css={css(mt4, mb3)}>
            <ExpansionPanel expanded={state.expanded} onChange={changeExpanded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontSize: '2rem', color: 'gray' }}>fixed schedules</Typography>
                    <div css={ml3}>
                        <IconButton onClick={(e) => { append(); e.stopPropagation(); }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        {fixedSchedules.map((x) =>
                            <Grid item xs={12} sm={3} key={x.id} css={css(mb2, mr4)}>
                                <FixedSchedule fixedSchedule={x} {...other} />
                            </Grid>
                        )}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

fixedScheduleList.propTypes = {
    fixedSchedules: propTypes.array,
    append: propTypes.func.isRequired
};

export default fixedScheduleList;
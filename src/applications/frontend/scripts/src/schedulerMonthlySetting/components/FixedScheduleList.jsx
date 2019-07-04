import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FixedSchedule from './FixedSchedule';

const fixedSchedules = ({ fixedSchedules, handleAppend, ...other }) => {
    const [state, setState] = React.useState({expanded: true});
    const onExpandedChange = (event, isExpanded) => {
        setState(prev => ({...prev, expanded: isExpanded ? true : false}));
    };

    return (
        <div className="mt-4 mb-3">
            <ExpansionPanel expanded={state.expanded} onChange={onExpandedChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontSize: '2rem', color: 'gray' }}>fixed schedules</Typography>
                    <div className="ml-3">
                        <IconButton onClick={(e) => { handleAppend(); e.stopPropagation(); }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        {fixedSchedules.map((x) =>
                            <Grid item xs={12} sm={3} key={x.id} className="mr-4 mb-2">
                                <FixedSchedule fixedSchedule={x} {...other} />
                            </Grid>
                        )}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

export default fixedSchedules;
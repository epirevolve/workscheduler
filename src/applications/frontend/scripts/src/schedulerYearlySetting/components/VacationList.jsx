import React from 'react';
import propTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Vacation from './Vacation';

const vacationList = ({ vacations, append, ...other }) => {
    const [state, setState] = React.useState({expanded: true});
    const onExpandedChange = (_event, isExpanded) => {
        setState((prev) => ({...prev, expanded: isExpanded ? true : false}));
    };

    return (
        <div className="mt-4 mb-3">
            <ExpansionPanel expanded={state.expanded} onChange={onExpandedChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontSize: '2rem' }}>vacations</Typography>
                    <div className="ml-3">
                        <IconButton onClick={(e) => { append(); e.stopPropagation(); }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        {vacations.map((x) =>
                            <Grid item xs={12} sm={3} key={x.id} className="mr-4 mb-2">
                                <Vacation vacation={x} {...other} />
                            </Grid>
                        )}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

vacationList.propTypes = {
    vacations: propTypes.array,
    append: propTypes.func.isRequired
};

export default vacationList;
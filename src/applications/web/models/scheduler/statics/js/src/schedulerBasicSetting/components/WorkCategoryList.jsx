import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import WorkCategory from './WorkCategory';

const workCategoryList = ({ workCategories, append, ...other }) => {
    const [state, setState] = React.useState({expanded: true});
    const onExpandedChange = (event, isExpanded) => {
        setState((prev) => ({...prev, expanded: isExpanded ? true : false}));
    };

    const createWorkCategoryPanel = (x) => (
        <Grid item xs={12} sm={4} key={x.id} className="mr-4 mb-2">
            <WorkCategory workCategory={x} {...other} />
        </Grid>
    );

    return (
        <div className="mt-4 mb-3">
            <ExpansionPanel expanded={state.expanded} onChange={onExpandedChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontSize: '2rem' }}>work categories</Typography>
                    <div className="ml-3">
                        <IconButton onClick={(e) => { append(); e.stopPropagation(); }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        {workCategories.map((x) => createWorkCategoryPanel(x))}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

workCategoryList.propTypes = {
    workCategories: PropTypes.array.isRequired,
    append: PropTypes.func.isRequired,
};

export default workCategoryList;
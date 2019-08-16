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

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { mt4, mb3, mb2, ml3, mr4 } from "margin";

const workCategoryList = ({ workCategories, append, ...other }) => {
    const [ state, setState ] = React.useState({ expanded: true });
    const onExpandedChange = (event, isExpanded) => {
        setState((prev) => ({ ...prev, expanded: isExpanded ? true : false }));
    };

    const createWorkCategoryPanel = (x) => (
        <Grid item xs={12} sm={4} key={x.id} css={css(mb2, mr4)}>
            <WorkCategory workCategory={x} {...other} />
        </Grid>
    );

    return (
        <div css={css(mt4, mb3)}>
            <ExpansionPanel expanded={state.expanded} onChange={onExpandedChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontSize: '2rem' }}>work categories</Typography>
                    <div css={ml3}>
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
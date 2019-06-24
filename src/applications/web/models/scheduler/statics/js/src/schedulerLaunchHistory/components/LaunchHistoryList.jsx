import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import LaunchHistory from './LaunchHistory';

const launchHistoryList = ({ launchHistories }) => (
    <>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            launch histories
        </Typography>
        <List>
            {launchHistories.map((x, i) => <LaunchHistory key={i} {...x} />)}
        </List>
    </>
);

launchHistoryList.propTypes = {
    launchHistories: PropTypes.array,
};

export default launchHistoryList;
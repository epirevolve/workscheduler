import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import LaunchHistory from './LaunchHistory';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { mx3 } from 'margin';

const launchHistoryList = ({ launchHistories, fetchLauchHistories }) => {
    React.useEffect(() => {
        fetchLauchHistories();
    }, []);
    return (
        <>
            <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
                launch histories
            </Typography>
            <List css={mx3}>
                {launchHistories.map((x, i) => <LaunchHistory key={i} {...x} />)}
            </List>
        </>
    );
};

launchHistoryList.propTypes = {
    launchHistories: PropTypes.array,
    fetchLauchHistories: PropTypes.func.isRequired
};

export default launchHistoryList;
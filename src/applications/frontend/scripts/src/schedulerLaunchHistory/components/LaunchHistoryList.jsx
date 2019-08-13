import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Box from "@material-ui/core/Box";

import LaunchHistory from './LaunchHistory';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { m2, mx3 } from 'margin';

const launchHistoryList = ({ launchHistories, fetchLauchHistories }) => {
    React.useEffect(() => {
        fetchLauchHistories();
    }, []);
    return (
        <Box css={m2}>
            <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
                launch histories
            </Typography>
            <Box css={mx3}>
                <List>
                    {launchHistories.map((x, i) => <LaunchHistory key={i} {...x} />)}
                </List>
            </Box>
        </Box>
    );
};

launchHistoryList.propTypes = {
    launchHistories: PropTypes.array,
    fetchLauchHistories: PropTypes.func.isRequired
};

export default launchHistoryList;
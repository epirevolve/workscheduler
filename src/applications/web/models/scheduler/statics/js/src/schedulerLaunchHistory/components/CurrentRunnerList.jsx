import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import CurrentRunner from './CurrentRunner';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { mx3 } from 'margin';

const currentRunnerList = ({ currentRunners, fetchCurrenRunners, teminateRunner }) => {
    React.useEffect(() => {
        fetchCurrenRunners();
    }, []);
    return (
        <>
            <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
                current runners
            </Typography>
            <List css={mx3}>
                {currentRunners != null && currentRunners.length > 0 ?
                    currentRunners.map((x, i) => <CurrentRunner key={i} {...x} teminateRunner={() => teminateRunner(x)} />) :
                    'no one is running now'}
            </List>
        </>
    );
};

currentRunnerList.propTypes = {
    currentRunners: PropTypes.array,
    fetchCurrenRunners: PropTypes.func.isRequired,
    teminateRunner: PropTypes.func.isRequired,
};

export default currentRunnerList;
import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import CurrentRunner from './CurrentRunner';

const currentRunnerList = ({ currentRunners, handleTeminateRunner }) => (
    <>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            current runners
        </Typography>
        <List>
            {currentRunners != null && currentRunners.length > 0 ?
                currentRunners.map((x, i) => <CurrentRunner key={i} {...x}
                handleTeminateRunner={() => handleTeminateRunner(x)} />) :
                'no one is running now'}
        </List>
    </>
);

currentRunnerList.propTypes = {
    currentRunners: PropTypes.array,
    handleTeminateRunner: PropTypes.func.isRequired,
};

export default currentRunnerList;
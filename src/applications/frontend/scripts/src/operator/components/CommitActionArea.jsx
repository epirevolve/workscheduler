import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mt3 } from 'margin';

const commitActionArea = ({ operator, save }) => (
    <Box css={mt3}>
        <Button variant="contained" color="primary" size="large"
            onClick={() => save(operator)}>
            Store Operator
        </Button>
    </Box>
);

commitActionArea.propTypes = {
    operator: propTypes.object,
    save: propTypes.func.isRequired
};

export default commitActionArea;
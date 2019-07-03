import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { mt3 } from 'margin';

const commitActionArea = ({ operator, save }) => (
    <Button css={mt3} variant="contained" color="primary" size="large"
        onClick={() => save(operator)}>
        Store Operator
    </Button>
);

commitActionArea.propTypes = {
    operator: propTypes.object,
    save: propTypes.func.isRequired
};

export default commitActionArea;
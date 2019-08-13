import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mt3 } from 'margin';

const CommitActionArea = ({
        user, save
    }) => (
    <Box css={mt3}>
        <Button variant="contained" onClick={() => save(user)} color="primary">
            Store User
        </Button>
    </Box>
);

CommitActionArea.propTypes = {
    user: propTypes.object,
    save: propTypes.func.isRequired
};

export default CommitActionArea;
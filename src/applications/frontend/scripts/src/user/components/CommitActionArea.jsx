import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mt3 } from 'margin';

const CommitActionArea = ({
        user, save
    }) => (
    <Button variant="contained" onClick={() => save(user)} css={mt3} color="primary">
        Store User
    </Button>
);

CommitActionArea.propTypes = {
    user: propTypes.object,
    save: propTypes.func.isRequired
};

export default CommitActionArea;
import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { mr1 } from 'margin';

const commitActionArea = ({ team, isAppend, close, remove, save }) => (
    <>
        <Box css={mr1}>
            <Button onClick={close} color="default">
                Close
            </Button>
        </Box>
        {!isAppend && (
            <Box css={mr1}>
                <Button onClick={() => remove(team.id)} variant="outlined" color="secondary">
                    Remove
                </Button>
            </Box>
        )}
        <Button onClick={() => save(team, isAppend)} variant="outlined" color="primary">
            Save
        </Button>
    </>
);

commitActionArea.propTypes = {
    team: propTypes.object.isRequired,
    isAppend: propTypes.bool.isRequired,
    close: propTypes.func.isRequired,
    remove: propTypes.func.isRequired,
    save: propTypes.func.isRequired
};

export default commitActionArea;
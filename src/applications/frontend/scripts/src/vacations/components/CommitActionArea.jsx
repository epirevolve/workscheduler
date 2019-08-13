import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { mr1 } from 'margin';

const commitActionArea = ({ scheduler, vacation, isAppend, close, remove, save }) => (
    <>
        <Button onClick={close} color="default" css={mr1}>
            Close
        </Button>
        {!isAppend && (
            <Button onClick={() => remove(vacation.id)} variant="outlined" color="secondary" css={mr1}>
                Remove
            </Button>
        )}
        <Button onClick={() => save(scheduler, vacation, isAppend)} variant="outlined" color="primary">
            Save
        </Button>
    </>
);

commitActionArea.propTypes = {
    scheduler: propTypes.object.isRequired,
    vacation: propTypes.object.isRequired,
    isAppend: propTypes.bool.isRequired,
    close: propTypes.func.isRequired,
    remove: propTypes.func.isRequired,
    save: propTypes.func.isRequired
};

export default commitActionArea;
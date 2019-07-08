import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const commitActionArea = ({ vacation, isAppend, close, remove, save }) => (
    <>
        <Button onClick={close} color="default">
            Close
        </Button>
        {!isAppend && (
            <Button onClick={() => remove(vacation.id)} variant="outlined" color="secondary">
                Remove
            </Button>
        )}
        <Button onClick={() => save(vacation, isAppend)} variant="outlined" color="primary">
            Save
        </Button>
    </>
);

commitActionArea.propTypes = {
    vacation: propTypes.object.isRequired,
    isAppend: propTypes.bool.isRequired,
    close: propTypes.func.isRequired,
    remove: propTypes.func.isRequired,
    save: propTypes.func.isRequired
};

export default commitActionArea;
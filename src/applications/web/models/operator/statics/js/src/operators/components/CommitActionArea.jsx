import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const commitActionArea = ({ operator, close, save }) => (
    <>
        <Button onClick={close} color="default">
            Close
        </Button>
        <Button onClick={() => save(operator)} color="primary" variant="outlined">
            Save
        </Button>
    </>
);

commitActionArea.propTypes = {
    operator: propTypes.object.isRequired,
    close: propTypes.func.isRequired,
    save: propTypes.func.isRequired,
};

export default commitActionArea;
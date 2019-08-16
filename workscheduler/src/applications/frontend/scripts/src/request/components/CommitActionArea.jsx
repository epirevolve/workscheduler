import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const commitActionArea = ({ request, monthlySetting, isAppend, close, remove, save }) => (
    <>
        <Button onClick={close} color="default">
            Close
        </Button>
        {!isAppend && (
            <Button onClick={() => remove(request.id)} color="secondary" variant="outlined">
                Remove
            </Button>
        )}
        <Button onClick={() => save(request, monthlySetting)} color="primary" variant="outlined">
            Save
        </Button>
    </>
);

commitActionArea.propTypes = {
    request: propTypes.object.isRequired,
    monthlySetting: propTypes.object.isRequired,
    isAppend: propTypes.bool.isRequired,
    close: propTypes.func.isRequired,
    remove: propTypes.func.isRequired,
    save: propTypes.func.isRequired,
};

export default commitActionArea;
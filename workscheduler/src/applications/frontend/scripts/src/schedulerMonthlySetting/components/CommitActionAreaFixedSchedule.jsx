import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const commitActionAreaFixedSchedule = ({ fixedSchedule, isAppend, close, remove, save }) => (
    <>
        <Button onClick={close} color="default">
            Close
        </Button>
        {!isAppend && (
            <Button onClick={() => remove(fixedSchedule.id)} variant="outlined" color="secondary">
                Remove
            </Button>
        )}
        <Button onClick={() => save(fixedSchedule, isAppend)} variant="outlined" color="primary">
            Save
        </Button>
    </>
);

commitActionAreaFixedSchedule.propTypes = {
    fixedSchedule: propTypes.object.isRequired,
    isAppend: propTypes.bool.isRequired,
    close: propTypes.func.isRequired,
    remove: propTypes.func.isRequired,
    save: propTypes.func.isRequired
};

export default commitActionAreaFixedSchedule;
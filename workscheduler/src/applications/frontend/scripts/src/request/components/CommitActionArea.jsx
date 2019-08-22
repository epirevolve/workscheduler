import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mt4, mr3, mb3 } from 'margin';

const actionAreaCss = css({
    display: 'inline-flex',
    '& > div': css({}, mr3)
}
, mt4, mb3);

const commitActionArea = ({ request, monthlySetting, isAppend, close, remove, save }) => (
    <Box css={actionAreaCss}>
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
    </Box>
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
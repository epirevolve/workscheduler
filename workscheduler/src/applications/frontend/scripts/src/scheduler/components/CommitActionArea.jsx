import React from 'react';
import propTypes from 'prop-types';

import Box from "@material-ui/core/Box";

import ProgressButton from 'ProgressButton';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mt4, mr3, mb3 } from 'margin';

const actionAreaCss = css({
    display: 'inline-flex',
    '& > div': css({}, mr3)
}
, mt4, mb3);

const commitActionArea = ({
    scheduler, isProgressing, save
    }) => (
    <Box css={actionAreaCss}>
        <ProgressButton label={'Save'} isProgressing={isProgressing} handleClick={() => save(scheduler)} />
    </Box>
);

commitActionArea.propTypes = {
    scheduler: propTypes.object,
    isProgressing: propTypes.bool,
    save: propTypes.func.isRequired
};

export default commitActionArea;
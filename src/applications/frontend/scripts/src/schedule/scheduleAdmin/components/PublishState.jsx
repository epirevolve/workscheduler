import React from 'react';
import propTypes from "prop-types";

import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { floatl } from 'float';
import { my3, mx5 } from 'margin';

const stateCss = css({
    color: 'tomato'
}, floatl, my3, mx5);

const publishState = ({ isPublished }) => (
    <Typography variant="h4" css={stateCss}>
        {isPublished ? 'Published' : ''}
    </Typography>
);

publishState.propTypes = {
    isPublished: propTypes.bool
};

export default publishState;
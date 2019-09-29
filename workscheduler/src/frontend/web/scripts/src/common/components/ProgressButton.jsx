import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const wrapperCss = css({
    position: 'relative',
    display: 'flex'
});

const waitingCss = css({
    position: 'absolute',
    margin: '10% 40%'
});

const progressButton = ({
        label, isProgressing, variant="contained", color="secondary",
        size="large", handleClick=() => {}
    }) => (
    <Box css={wrapperCss}>
        <Button variant={variant} color={color} size={size} disabled={isProgressing} onClick={handleClick}>
            {label}
        </Button>
        {isProgressing && <CircularProgress size={24} css={waitingCss} />}
    </Box>
);

progressButton.propTypes = {
    label: PropTypes.string.isRequired,
    isProgressing: PropTypes.bool.isRequired,
    variant: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    handleClick: PropTypes.func,
};

export default progressButton;
import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const requestCss = css({
    padding: '0rem',
    margin: '.1rem 0rem',
    backgroundColor: '#ffc107',
    borderColor: '#ffc107',
    position: 'absolute',
    width: '10%',
    zIndex: 3
});

const request = ({ request, edit, days }) => (
    <Button css={requestCss} onClick={() => edit(request)}>
        { request.title }
    </Button>
);

request.propTypes = {
    request: propTypes.object.isRequired,
    edit: propTypes.func.isRequired,
    days: propTypes.number
};

export default request;
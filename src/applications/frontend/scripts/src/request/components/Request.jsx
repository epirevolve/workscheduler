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

const request = ({ request, edit, className }) => (
    <button className={`btn btn-block ${className}`} css={requestCss}
        type="button" onClick={edit}
        data-at-from={request.atFrom}
        data-at-to={request.atTo}>
        { request.title }
    </button>
);

request.propTypes = {
    request: propTypes.object.isRequired,
    edit: propTypes.func.isRequired,
    className: propTypes.string
};

export default request;
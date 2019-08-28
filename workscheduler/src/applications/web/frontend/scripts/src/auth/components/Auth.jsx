import React from 'react';
import propTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { m2, mb4, ml5 } from "margin";
import { floatr } from "float";

const auth = ({ logInId, password, changeLogInId, changePassword, tryToAuth }) => (
    <Box css={css({}, mb4, floatr)}>
        <TextField placeholder="login id" autoFocus css={m2} value={logInId}
            onChange={changeLogInId} required />
        <TextField placeholder="password" css={m2} type="password" value={password}
            onChange={changePassword} required />
        <Button variant="contained" color="primary" css={css({}, m2, ml5)} size="large" onClick={() => tryToAuth(logInId, password)}>
            Login
        </Button>
    </Box>
);

auth.propTypes = {
    logInId: propTypes.string,
    password: propTypes.string,
    changeLogInId: propTypes.func.isRequired,
    changePassword: propTypes.func.isRequired,
    tryToAuth: propTypes.func.isRequired,
};

export default auth;
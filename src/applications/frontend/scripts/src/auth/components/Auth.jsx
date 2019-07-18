import React from 'react';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { m2, mb4 } from "margin";
import { floatr } from "float";

const dataset = document.querySelector('script[src*="auth"]').dataset;
const url = dataset.url;

const auth = () => (
    <form action={url} method="post" css={floatr}>
        <Input name="csrf_token" type="hidden" value={csrfToken} readOnly />
        <div css={mb4}>
            <TextField autoFocus name='loginId' css={m2} label="login id" required />
            <TextField name='password' css={m2} label="password" type="password" required />
        </div>
        <Button variant="contained" color="primary" type="submit" css={css(m2, floatr)} size="large">
            Login
        </Button>
    </form>
);

export default auth;
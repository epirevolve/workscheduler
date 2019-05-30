import React from 'react'

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const dataset = document.querySelector('script[src*="auth"]').dataset;
const url = dataset.url;

const auth = () => (
    <form action={url} method="post">
        <Input name="csrf_token" type="hidden" value={csrfToken} readOnly />
        <div className="mb-4">
            <TextField autoFocus name='loginId' className="m-2" label="login id" required />
            <TextField name='password' className="m-2" label="password" type="password" required />
        </div>
        <Button variant="contained" color="primary" type="submit" className="m-2" size="large">
            Login
        </Button>
    </form>
)

export default auth;
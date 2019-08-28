import React from 'react';

import Box from '@material-ui/core/Box';

import ShowSnackbar from 'ShowSnackbar';

import Publicity from './Publicity';
import TryToAuth from '../containers/TryToAuth';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { m5 } from "margin";

const app = () => (
    <Box css={m5}>
        <Publicity />
        <TryToAuth />
        <ShowSnackbar />
    </Box>
);

export default app;
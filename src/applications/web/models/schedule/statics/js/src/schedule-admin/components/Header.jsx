import React from 'react';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ChangeTeam from '../containers/ChangeTeam';
import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import ExportAsCsv from '../../schedule/containers/ExportAsCsv';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mb3 } from 'margin';

const header = () => (
    <AppBar position="static" color="default" css={mb3}>
        <Toolbar>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <ChangeTeam />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ExportAsCsv />
                    <ChangeSelectMonth />
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
);

export default header;
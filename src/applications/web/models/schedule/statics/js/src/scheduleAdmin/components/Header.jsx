import React from 'react';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ConfirmPublishState from '../containers/ConfirmPublishState';
import ChangeTeam from '../containers/ChangeTeam';
import ChangeSelectMonth from '../containers/ChangeSelectMonth';
import ExportAsCsv from '../containers/ExportAsCsv';
import CommitSchedules from '../containers/CommitSchedules';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mb3 } from 'margin';

const header = ({isPublished = true}) => (
    <AppBar position="static" color="default" css={mb3}>
        <Toolbar>
            <Grid container>
                <Grid item xs={12} lg={4}>
                    <ChangeTeam />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <ConfirmPublishState />
                    <ExportAsCsv />
                    <ChangeSelectMonth />
                    <CommitSchedules />
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
);

export default header;
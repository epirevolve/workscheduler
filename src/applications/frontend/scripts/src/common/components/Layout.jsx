import React from 'react';
import propTypes from "prop-types";

import LinearProgress from '@material-ui/core/LinearProgress';

import Theme from 'ColorTheme';

import Drawer from './Drawer';
import Nav from './Nav';
import ShowSnackbar from 'ShowSnackbar';

import { StylesProvider } from '@material-ui/styles';
import { MuiThemeProvider } from "@material-ui/core/styles";

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { m4 } from 'margin';

const margin10Css = css({
    margin: '10rem',
    marginTop: '25%'
});

const layout = ({ children, isLoading = false }) => {
    const [ state, setState ] = React.useState({ open: false });
    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={Theme}>
                <Nav setDrawerOpen={setState} />
                <Drawer open={state.open} setOpen={setState} />
                <div css={m4}>
                    {isLoading && (<LinearProgress variant="query" css={margin10Css} />)}
                    {!isLoading && (children)}
                </div>
                <ShowSnackbar />
            </MuiThemeProvider>
        </StylesProvider>
    );
};

layout.propTypes = {
    children: propTypes.any,
    isLoading: propTypes.bool
};

export default layout;
import React from 'react';
import propTypes from "prop-types";

import { StylesProvider } from '@material-ui/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Theme from 'ColorTheme';

import Drawer from './Drawer';
import Nav from './Nav';
import ShowSnackbar from 'ShowSnackbar';

/** @jsx jsx */
import { jsx } from '@emotion/core';

import { m4 } from 'margin';

const layout = ({ children }) => {
    const [ state, setState ] = React.useState({ open: false });
    return (
        <MuiThemeProvider theme={Theme}>
            <StylesProvider injectFirst>
                <Nav setDrawerOpen={setState} />
                <Drawer open={state.open} setOpen={setState} />
                <div css={m4}>
                    {children}
                </div>
                <ShowSnackbar />
            </StylesProvider>
        </MuiThemeProvider>
    );
};

layout.propTypes = {
    children: propTypes.any
};

export default layout;
import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

import Operator from './Operator';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { mt2 } from 'margin';

const listCss = css({
    maxHeight: '78vh',
    overflowY: 'auto'
});

const operatorList = ({ operators, edit }) => (
    <>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    operators
                </Typography>
            </Toolbar>
        </AppBar>
        <Box css={mt2}>
            <List css={listCss}>
                {operators.map((x, i) => <Operator key={i} operator={x} edit={() => edit(x)} />)}
            </List>
        </Box>
    </>
);

operatorList.propTypes = {
    operators: PropTypes.array.isRequired,
    edit: PropTypes.func.isRequired,
};

export default operatorList;
import React from 'react';
import propTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';

import Vacation from './Vacation';

const vacationList = ({ vacations, append, edit }) => (
    <>
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    vacations
                </Typography>
                <div style={{ textAlign: 'right' }}>
                    <IconButton onClick={append}>
                        <AddIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        <List style={{ maxHeight: '76vh', overflowY: 'auto' }}>
            {vacations.map((x, i) => <Vacation key={i} vacation={x} edit={() => edit(x)} />)}
        </List>
    </>
);

vacationList.propTypes = {
    vacations: propTypes.array,
    append: propTypes.func.isRequired,
    edit: propTypes.func.isRequired
};

export default vacationList;
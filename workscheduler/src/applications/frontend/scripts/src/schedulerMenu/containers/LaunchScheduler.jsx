import React from 'react';
import { connect } from 'react-redux';

import MenuItems from '../components/MenuItems';

import { showSnackbar } from 'snackbarActions';

import { startLaunchScheduler } from '../actions';

const mapStateToProps = (state) => ({
    team: state.menu.team
});

const mapDispatchToProps = (dispatch) => ({
    onLaunchScheduler: (team, month, year) => {
        dispatch(showSnackbar('Started to make schedule. Please wait until it will be done.'));
        dispatch(startLaunchScheduler(team, month, year));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
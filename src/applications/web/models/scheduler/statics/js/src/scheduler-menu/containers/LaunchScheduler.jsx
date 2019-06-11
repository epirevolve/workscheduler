import React from 'react';
import { connect } from 'react-redux';

import MenuItems from '../components/MenuItems';

import { showSnackbar } from 'snackbarActions';

const mapStateToProps = (state) => ({
    team: state.menu.team
});

const mapDispatchToProps = (dispatch) => ({
	onLaunchScheduler: () => dispatch(showSnackbar('Started to make schedule. Please wait until it will be done.'))
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
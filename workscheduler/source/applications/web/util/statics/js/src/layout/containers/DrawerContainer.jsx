import React from 'react';
import { connect } from 'react-redux';

import { closeDrawer } from '../actions';

import Drawer from '../components/Drawer';

const mapStateToProps = (state) => ({
    auth: state.auth,
    opened: state.opened
});

const mapDispatchToProps = (dispatch) => ({
    handleCloseDrawer: () => dispatch(closeDrawer())
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
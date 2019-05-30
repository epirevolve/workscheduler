import React from 'react';
import { connect } from 'react-redux';

import { openDrawer } from '../actions';

import Nav from '../components/Nav';

const mapStateToProps = (state) => ({
    auth: state.auth,
    opened: state.opened
});

const mapDispatchToProps = (dispatch) => ({
    handleOpenDrawer: () => dispatch(openDrawer())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
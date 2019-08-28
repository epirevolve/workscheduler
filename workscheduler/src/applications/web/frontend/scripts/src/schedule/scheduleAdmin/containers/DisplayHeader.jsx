import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

const mapStateToProps = (state) => ({
    team: state.teams.team,
});

export default connect(mapStateToProps)(Header);
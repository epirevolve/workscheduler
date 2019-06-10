import React from 'react';
import { connect } from 'react-redux';

import MenuItems from '../components/MenuItems';

const mapStateToProps = (state) => ({
    team: state.menu.team
});

export default connect(mapStateToProps)(MenuItems);
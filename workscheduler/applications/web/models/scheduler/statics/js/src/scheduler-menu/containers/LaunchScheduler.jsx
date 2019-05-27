import React from 'react';
import { connect } from 'react-redux';

import MenuItems from '../components/MenuItems';

const mapStateToProps = (state) => ({
    affiliation: state.menu.affiliation
});

export default connect(mapStateToProps)(MenuItems);
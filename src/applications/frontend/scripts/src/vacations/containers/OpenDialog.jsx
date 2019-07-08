import React from 'react';
import { connect } from 'react-redux';

import VacationDialog from '../components/VacationDialog';

const mapStateToProps = (state) => ({
    isOpen: state.ui.dialogOpen
});

export default connect(mapStateToProps)(VacationDialog);
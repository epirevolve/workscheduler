import React from 'react';
import { connect } from 'react-redux';

import FixedScheduleDialog from '../components/FixedScheduleDialog';

const mapStateToProps = (state) => ({
    isOpen: state.ui.dialogOpen
});

export default connect(mapStateToProps)(FixedScheduleDialog);
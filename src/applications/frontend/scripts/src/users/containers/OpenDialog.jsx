import React from 'react';
import { connect } from 'react-redux';

import UserDialog from '../components/UserDialog';

const mapStateToProps = (state) => ({
    isOpen: state.ui.dialogOpen
});

export default connect(mapStateToProps)(UserDialog);
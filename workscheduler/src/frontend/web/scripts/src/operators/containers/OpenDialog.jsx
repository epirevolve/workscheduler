import React from 'react';
import { connect } from 'react-redux';

import OperatorDialog from '../components/OperatorDialog';

const mapStateToProps = (state) => ({
    isOpen: state.ui.dialogOpen
});

export default connect(mapStateToProps)(OperatorDialog);
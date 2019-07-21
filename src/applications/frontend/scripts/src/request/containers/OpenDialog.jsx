import React from 'react';
import { connect } from 'react-redux';

import RequestDialog from '../components/RequestDialog';

const mapStateToProps = (state) => ({
    isOpen: state.ui.dialogOpen
});

export default connect(mapStateToProps)(RequestDialog);
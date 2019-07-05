import React from 'react';
import { connect } from 'react-redux';

import TeamDialog from '../components/TeamDialog';

const mapStateToProps = (state) => ({
    isOpen: state.ui.dialogOpen
});

export default connect(mapStateToProps)(TeamDialog);
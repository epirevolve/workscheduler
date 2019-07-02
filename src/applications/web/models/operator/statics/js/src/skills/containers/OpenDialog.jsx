import React from 'react';
import { connect } from 'react-redux';

import SkillDialog from '../components/SkillDialog';

const mapStateToProps = (state) => ({
    isOpen: state.ui.dialogOpen
});

export default connect(mapStateToProps)(SkillDialog);
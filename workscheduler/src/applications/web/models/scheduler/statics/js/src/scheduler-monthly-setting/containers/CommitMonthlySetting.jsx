import React from 'react';
import { connect } from 'react-redux';

import CommitActionArea from '../components/CommitActionArea';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    monthlySetting: state.monthlySetting,
    isProgressing: state.ui.isProgressing
});

const mapDispatchToProps = (dispatch) => ({
    onMonthlySettingSave: (monthlySetting) => dispatch(actions.startSaveMonthlySetting(monthlySetting)),
    onMonthlySettingPublic: (monthlySetting) => dispatch(actions.startPublicMonthlySetting(monthlySetting))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);
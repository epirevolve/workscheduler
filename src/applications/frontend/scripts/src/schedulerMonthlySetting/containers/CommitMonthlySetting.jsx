import React from 'react';
import { connect } from 'react-redux';

import CommitActionArea from '../components/CommitActionArea';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    monthlySetting: state.monthlySetting,
    isProgressing: state.ui.isProgressing
});

const mapDispatchToProps = (dispatch) => ({
    save: (monthlySetting) => dispatch(actions.startUpdateMonthlySetting(monthlySetting)),
    publish: (monthlySetting) => dispatch(actions.startPublicMonthlySetting(monthlySetting))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);
import React from 'react';
import { connect } from 'react-redux';

import CommitActionArea from '../components/CommitActionArea';

import * as apiActions from '../actions/api';

const mapStateToProps = (state) => ({
    monthlySetting: state.monthlySetting,
    isProgressing: state.ui.isProgressing
});

const mapDispatchToProps = (dispatch) => ({
    save: (monthlySetting) => dispatch(apiActions.startUpdateMonthlySetting(monthlySetting)),
    publish: (monthlySetting) => dispatch(apiActions.startPublicMonthlySetting(monthlySetting))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);
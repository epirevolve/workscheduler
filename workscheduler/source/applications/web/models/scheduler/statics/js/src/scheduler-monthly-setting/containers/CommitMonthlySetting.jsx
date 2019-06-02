import React from 'react';
import { connect } from 'react-redux';

import { CommitActionArea } from '../components/CommitActionArea';

import * as actions from '../actions';

const mapStateToProps = (state) => ({
    monthlySetting: state.monthlySetting
});

const mapDispatchToProps = (dispatch) => ({
    onSaveMonthlySetting: (monthlySetting) => dispatch(actions.updateMonthlySetting(monthlySetting)),
    onPublicMonthlySetting: (monthlySetting) => dispatch(actions.publicMonthlySetting(monthlySetting))
});

export default connect(mapStateToProps)(CommitActionArea);
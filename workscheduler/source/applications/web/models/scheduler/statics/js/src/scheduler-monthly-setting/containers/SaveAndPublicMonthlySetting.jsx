import React from 'react';
import { connect } from 'react-redux';

import { startSaveMonthlySetting, startPublicMonthlySetting } from '../actions';

import SaveAndPublic from '../components/SaveAndPublic';

const mapStateToProps = (state) => ({
    monthlySetting: state.monthlySetting,
    isProgressing: state.ui.isProgressing
});

const mapDispatchToProps = (dispatch) => ({
	onMonthlySettingSave: (monthlySetting) => {
		dispatch(startSaveMonthlySetting(monthlySetting));
	},

	onMonthlySettingPublic: (monthlySetting) => {
		dispatch(startPublicMonthlySetting(monthlySetting));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveAndPublic);
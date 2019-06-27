import React from 'react';
import propTypes from 'prop-types';

import YearlySettingList from './YearlySettingList';

const yearlySettings = ({ ...other }) => (
	<>
		<YearlySettingList {...other} />
	</>
);

yearlySettings.propTypes = {
	append: propTypes.func.isRequired
};

export default yearlySettings;
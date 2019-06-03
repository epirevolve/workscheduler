import React from 'react';

import ProgressButton from 'ProgressButton';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const wrapperCss = css({
	display: 'inline-flex',
	marginTop: '3rem',
	marginBottom: '1rem',
	'& > div': {
		marginRight: '3rem'
	}
});

const commitMonthlySetting = ({ monthlySetting, isProgressing, onMonthlySettingSave, onMonthlySettingPublic }) => {
	return (
		<div css={wrapperCss}>
			<ProgressButton label={'Save'} isProgressing={isProgressing} handleClick={() => onMonthlySettingSave(monthlySetting)} />
			<ProgressButton label={'Publish Calendar'} color="primary" isProgressing={isProgressing}
				handleClick={() => onMonthlySettingPublic(monthlySetting)} />
		</div>
	);
};

export default commitMonthlySetting;
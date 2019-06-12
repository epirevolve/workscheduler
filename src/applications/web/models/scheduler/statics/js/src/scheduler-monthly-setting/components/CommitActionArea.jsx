import React from 'react';

import ProgressButton from 'ProgressButton';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mt5, mr5, mb3 } from 'margin';

const actionAreaCss = css({
	display: 'inline-flex',
	'& > div': css({},mr5)
}
,mt5,mb3);

const commitMonthlySetting = ({
		monthlySetting, isProgressing, onMonthlySettingSave, onMonthlySettingPublic
	}) => (
	<div css={actionAreaCss}>
		<ProgressButton label={'Save'} isProgressing={isProgressing} handleClick={() => onMonthlySettingSave(monthlySetting)} />
		<ProgressButton label={'Publish Calendar'} color="primary" isProgressing={isProgressing}
			handleClick={() => onMonthlySettingPublic(monthlySetting)} />
	</div>
);

export default commitMonthlySetting;
import React from 'react';

import Table from '@material-ui/core/Table';

import DayBody from './DayBody';
import DayHeaderRow from './DayHeaderRow';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const wrapperCss = css({
	overflowX: 'scroll',
	display: 'inline-block !important',
	whiteSpace: 'nowrap'
});

const dayTable = ({ days, ...other }) => (
	<Table css={wrapperCss}>
		<DayHeaderRow days={days} />
		<DayBody days={days} {...other} />
	</Table>
);

export default dayTable;
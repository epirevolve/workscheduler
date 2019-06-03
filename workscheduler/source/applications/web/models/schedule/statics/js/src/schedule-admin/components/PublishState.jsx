import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const typographyCss = css({
	float: 'left'
});

const mr1Css = css({
	marginRight: '1rem'
});

const publishState = ({ schedules, isPublished, onSaveSchedules, onPublicSchedule, onTerminateSchedule }) => {
	return (
		<div css={css`
			color: lightslategray !important;
			margin-top: 1rem;
		`}>
			<Typography variant="h5" css={typographyCss}>
				This schedule is {isPublished ? 'published' : 'not published'}.
			</Typography>
			<div css={css`
				float: right;
			`}>
				<Button onClick={() => onSaveSchedules(schedules)} variant="outlined" color="primary"
					size="large" css={mr1Css}>
					Save
				</Button>
				{() => {
					if (isPublished) {
						return (
							<Button onClick={onTerminateSchedule} color="default" size="large" css={mr1Css}>
								Terminate
							</Button>
						);
					}
					else {
						return (
							<Button onClick={onPublicSchedule} variant="outlined" color="secondary"
								size="large" css={mr1Css}>
								Publish
							</Button>
						);
					}
				}}
			</div>
		</div>
	);
};

export default publishState;
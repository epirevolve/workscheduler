import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const wrapperCss = css({
	position: 'relative',
});

const progressButton = ({
		label, isProgressing, variant="contained", color="secondary",
		size="large", onClick=() => {}
	}) => {
	<div css={wrapperCss}>
		<Button variant={variant} color={color} size={size} disabled={isProgressing} onClick={onClick}>
			{label}
		</Button>
		{isProgressing && <CircularProgress size={24} />}
	</div>;
};

progressButton.propTypes = {
	label: PropTypes.string.isRequired,
	isProgressing: PropTypes.bool.isRequired,
	variant: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.string,
	onClick: PropTypes.func,
};

export default progressButton;
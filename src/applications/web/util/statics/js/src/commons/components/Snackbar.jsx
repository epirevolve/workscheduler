import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const snackBar = ({ isOpen, message, handleClose }) => (
	<Snackbar
		anchorOrigin={{
			vertical: 'top',
			horizontal: 'center', }}
		open={isOpen}
		autoHideDuration={6000}
		onClose={handleClose}
		ContentProps={{
			'aria-describedby': 'message-id',
		}}
		message={<span id="message-id">{message}</span>}
		action={[
			<IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
				<CloseIcon />
			</IconButton>,
		]}
	/>
);

export default snackBar;
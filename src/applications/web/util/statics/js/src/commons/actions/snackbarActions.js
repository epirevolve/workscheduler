import { SHOW_SNACKBAR, CLOSE_SNACKBAR } from '../actionTypes';

import { INFO } from 'snackbarTypes';

export const showSnackbar = (message, status = INFO) => ({
	type: SHOW_SNACKBAR,
	payload: { message, status }
});

export const closeSnackbar = () => ({
	type: CLOSE_SNACKBAR
});
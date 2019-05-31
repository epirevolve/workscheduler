import { SHOW_SNACKBAR, CLOSE_SNACKBAR } from '../actionTypes';

export const showSnackbar = (message) => ({
	type: SHOW_SNACKBAR,
	payload: { message }
});

export const closeSnackbar = () => ({
	type: CLOSE_SNACKBAR
})
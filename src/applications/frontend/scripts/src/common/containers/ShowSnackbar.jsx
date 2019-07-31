import React from 'react';
import { connect } from 'react-redux';

import Snackbar from 'Snackbar';
import { closeSnackbar } from 'snackbarActions';

const mapStateToProps = (state) => ({
    isOpen: state.snackbar.isOpen,
    message: state.snackbar.message,
    status: state.snackbar.status
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(closeSnackbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
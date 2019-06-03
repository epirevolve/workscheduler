import React from 'react';
import { connect } from 'react-redux';

import Snackbar from 'Snackbar';
import { closeSnackbar } from 'snackbarActions';

const mapStateToProps = (state) => ({
    isOpen: state.snackbar.isOpen,
    message: state.snackbar.message
});

const mapDispatchToProps = (dispatch) => ({
    handleClose: () => dispatch(closeSnackbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
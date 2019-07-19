import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import RequestDialog from '../components/RequestDialog';

const mapStateToProps = (state) => ({
    request: state.requestDialog
});

const mapDispatchToProps = (dispatch) => ({
    close: () => dispatch(actions.closeDialog()),
    remove: (id) => dispatch(actions.startRemoveRequest(id)),
    save: (request, isAppend) => {
        const action = isAppend ? actions.startAppendRequest : actions.startUpdateRequest;
        dispatch(action(request));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestDialog);
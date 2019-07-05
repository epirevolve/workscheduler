import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import CommitActionArea from '../components/CommitActionArea';

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    save: (user) => dispatch(actions.startUpdateMyself(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitActionArea);
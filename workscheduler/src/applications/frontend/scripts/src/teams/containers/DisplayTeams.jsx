import React from 'react';
import { connect } from 'react-redux';

import TeamList from '../components/TeamList';

import * as pageActions from '../actions/page';

const mapStateToProps = (state) => ({
    teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({
    append: async () => dispatch(await pageActions.openDialogToAppend()),
    edit: (user) => dispatch(pageActions.openDialogToUpdate(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
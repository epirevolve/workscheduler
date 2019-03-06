import React from 'react';
import { connect } from 'react-redux';

import WorkCategories from '../components/WorkCategories';

import { addWorkCategory } from '../actions';
import { removeWorkCategory } from '../actions';
import { changeWorkCategoryTitle } from '../actions';

const mapStateToProps = (state) => ({
    workCategories: state.scheduler.workCategories
});

const mapDispatchToProps = (dispatch) => ({
    handleAppend: () => {dispatch(addWorkCategory())},
    handleRemove: () => (id) => {dispatch(removeWorkCategory(id))},
    onTitleChange: (id) => (e) => dispatch(changeWorkCategoryTitle(id, e.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkCategories);
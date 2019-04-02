import React from 'react';
import { connect } from 'react-redux';

import Affiliations from '../components/Affiliations';

import { changeAffiliation } from '../actions';

const mapStateToProps = (state) => ({
    affiliation: state.menu.affiliation
});

const mapDispatchToProps = (dispatch) => ({
    onAffiliationChange: (e) => { dispatch(changeAffiliation(e.target.value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Affiliations);
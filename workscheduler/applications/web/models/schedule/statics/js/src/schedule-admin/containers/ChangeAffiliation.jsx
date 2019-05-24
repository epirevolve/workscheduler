import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { requestSchedules } from '../../schedule/actions';
import { changeAffiliation } from '../actions';

import Affiliations from '../components/Affiliations';

const mapStateToProps = (state) => ({
    affiliation: state.affiliations.affiliation,
    scheduleOf: state.schedules.scheduleOf
})

const mapDispatchToProps = (dispatch) => ({
    onAffiliationChange: (scheduleOf, e) => {
        const affiliation = e.target.value;
        dispatch(requestSchedules(affiliation, scheduleOf));
        dispatch(changeAffiliation(affiliation));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Affiliations);
import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { requestSchedules } from '../../schedule/actions';
import { changeAffiliation } from '../actions';

import Affiliations from '../components/Affiliations';

const mapStateToProps = (state) => ({
    affiliation: state.schedules.affiliation,
    scheduleOf: state.schedules.scheduleOf
})

const mapDispatchToProps = (dispatch) => ({
    onAffiliationChange: (scheduleOf, e) => {
        const affiliation = e.target.value;
        dispatch(requestSchedules());
        changeAffiliation(affiliation, scheduleOf)
            .then(action => dispatch(action));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Affiliations);
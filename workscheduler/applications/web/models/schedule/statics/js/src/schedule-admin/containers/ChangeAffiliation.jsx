import React from 'react'
import { connect } from 'react-redux'

import requestAgent from 'superagent';

import { changeAffiliation } from '../actions';

import Affiliations from '../components/Affiliations';

const mapStateToProps = (state) => ({
    affiliation: state.schedules.affiliation,
    scheduleOf: state.schedules.scheduleOf
})

const mapDispatchToProps = (dispatch) => ({
    onAffiliationChange: (scheduleOf, e) => {
        const affiliation = e.target.value;
        const res = requestAgent
            .get(`/schedules/api?affiliation-id=${affiliation.id}&schedule-of=${scheduleOf}`)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                res = JSON.parse(res.text);
                dispatch(changeAffiliation(res.schedules, res.totals))
            })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Affiliations);
import React from 'react'
import { connect } from 'react-redux'

import Schedules from '../components/Schedules';

import { fetchSchedules } from '../../schedule/actions';

const mapStateToProps = (state) => ({
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules,
    totals: state.schedules.totals,
    affiliation: state.affiliations.affiliation,
    scheduleOf: state.schedules.scheduleOf
})

const mapDispatchToProps = (dispatch) => ({
    onLoad: ({ affiliation, scheduleOf }) => {
        fetchSchedules(affiliation, scheduleOf)
            .then(action => dispatch(action))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
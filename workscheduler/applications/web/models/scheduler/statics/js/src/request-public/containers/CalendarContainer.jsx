import React from 'react'

import { connect } from 'react-redux'

import { openDialogToAppend } from '../actions'
import { openDialogToEdit } from '../actions'

import RequestCalendar from '../components/RequestCalendar'

const mapStateToProps = (state) => ({
    calendar: state.calendar
})

const mapDispatchToProps = (dispatch) => ({
    handleAppend: (atFrom, atTo) => dispatch(openDialogToAppend(atFrom, atTo)),
    handleEdit: (request) => dispatch(openDialogToEdit(request))
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestCalendar)
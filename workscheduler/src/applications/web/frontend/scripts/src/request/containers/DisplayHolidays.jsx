import React from 'react';
import { connect } from 'react-redux';

import HolidayInfo from "../components/HolidayInfo";

const mapStateToProps = (state) => ({
    isPublished: state.monthlySetting.isPublished,
    holidays: state.monthlySetting.holidays,
    vacations: state.vacations
});

export default connect(mapStateToProps)(HolidayInfo);
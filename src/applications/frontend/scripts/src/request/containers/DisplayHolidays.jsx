import React from 'react';
import { connect } from 'react-redux';

import HolidayInfo from "../components/HolidayInfo";

const mapStateToProps = (state) => ({
    holidays: state.monthlySetting.holidays
});

export default connect(mapStateToProps)(HolidayInfo);
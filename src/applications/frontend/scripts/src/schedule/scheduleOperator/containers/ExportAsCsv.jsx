import React from 'react';
import { connect } from 'react-redux';

import CsvExportButton from '../../common/components/CsvExportButton';

const dataset = document.querySelector('script[id="baseSchedule"]').dataset;
const team = JSON.parse(dataset.team);

const mapStateToProps = (state) => ({
    team,
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules
});

export default connect(mapStateToProps)(CsvExportButton);
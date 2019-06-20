import React from 'react';
import { connect } from 'react-redux';

import CsvExportButton from '../components/CsvExportButton';
const dataset = document.querySelector('script[id="base-schedule"]').dataset;
const team = JSON.parse(dataset.team);

const mapStateToProps = (state) => ({
    team,
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules
});

export default connect(mapStateToProps)(CsvExportButton);
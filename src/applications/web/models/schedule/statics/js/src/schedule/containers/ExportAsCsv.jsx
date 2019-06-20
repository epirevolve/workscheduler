import React from 'react';
import { connect } from 'react-redux';

import CsvExportButton from '../components/CsvExportButton';

const mapStateToProps = (state) => ({
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules
});

export default connect(mapStateToProps)(CsvExportButton);
import React from 'react';
import { connect } from 'react-redux';

import CsvExportButton from '../../schedule/components/CsvExportButton';

const mapStateToProps = (state) => ({
    team: state.teams.team,
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules
});

export default connect(mapStateToProps)(CsvExportButton);
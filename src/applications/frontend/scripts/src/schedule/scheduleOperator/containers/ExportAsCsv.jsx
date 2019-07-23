import React from 'react';
import { connect } from 'react-redux';

import CsvExportButton from '../../common/components/CsvExportButton';

import { team } from "../../common/embeddedData";

const mapStateToProps = (state) => ({
    team,
    daySettings: state.schedules.daySettings,
    schedules: state.schedules.schedules,
    workCategories: state.schedules.workCategories,
    availableSigns: state.schedules.availableSigns,
});

export default connect(mapStateToProps)(CsvExportButton);
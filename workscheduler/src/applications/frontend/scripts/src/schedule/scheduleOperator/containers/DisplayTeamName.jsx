import React from 'react';
import { connect } from 'react-redux';

import TeamName from '../components/TeamName';

const dataset = document.querySelector('script[id="baseSchedule"]').dataset;
const team = JSON.parse(dataset.team);

const mapStateToProps = () => ({
    team,
});

export default connect(mapStateToProps)(TeamName);
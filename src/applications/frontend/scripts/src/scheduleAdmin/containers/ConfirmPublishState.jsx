import React from 'react';
import { connect } from 'react-redux';

import PublishState from '../components/PublishState';

const mapStateToProps = (state) => ({
    isPublished: state.schedules.isPublished
});

export default connect(mapStateToProps)(PublishState);
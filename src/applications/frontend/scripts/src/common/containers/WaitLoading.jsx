import React from 'react';
import { connect } from 'react-redux';

import Layout from "../components/Layout";

const mapStateToProps = (state) => ({
    isLoading: state.ui.isLoading
});

export default connect(mapStateToProps)(Layout);
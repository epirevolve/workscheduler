import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Button from '@material-ui/core/Button';

import { AlertManager } from 'alert-helper';

const dataset = document.querySelector('script[src*="scheduler-basic-setting"]').dataset;
const url = dataset.url;

class BasicSettingContainer extends React.Component {
    handleSave (scheduler) {
        requestAgent
            .put(url)
            .send(scheduler)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('successfully storing scheduler basic setting.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with storing basic setting...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger')
            });
    }

    render () {
        const { scheduler } = this.props;

        return (
            <div className="my-4">
                <Button className="mr-3" variant="contained" color="primary" size="large"
                    onClick={() => this.handleSave(scheduler)}>
                    Save
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    scheduler: state.scheduler
});

export default connect(mapStateToProps)(BasicSettingContainer);
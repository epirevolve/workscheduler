import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Button from '@material-ui/core/Button';

import { AlertManager } from 'alert-helper';

const $script = $('script[src*="scheduler-monthly-setting"]');

const url = $script.data('urlSave');

class ActionContainer extends React.Component {
    handleSave (monthlySetting) {
        requestAgent
            .post(url)
            .send(monthlySetting)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('we succeeded to store monthly setting.' +
                    ' if you can public this calendar to operators, please click public calendar button.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with storing monthly setting...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
    }

    handlePublish (monthlySetting) {
        requestAgent
            .post(`${url}/public`)
            .send(monthlySetting)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('we succeeded to publish monthly setting.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with publishing monthly setting...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
    }

    render () {
        const { monthlySetting } = this.props;

        return (
            <React.Fragment>
                <Button className="m-3" variant="contained" color="default" onClick={() => window.history.back()}>
                    Go Back
                </Button>
                <Button className="m-3" variant="contained" color="primary" onClick={() => this.handleSave(monthlySetting)}>
                    Save
                </Button>
                <Button className="m-3" variant="contained" color="secondary" onClick={() => this.handlePublish(monthlySetting)}>
                    Publish Calendar
                </Button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    monthlySetting: state.monthlySetting
});

export default connect(mapStateToProps)(ActionContainer);
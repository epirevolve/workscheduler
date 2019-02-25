import React from 'react';

import requestAgent from 'superagent';

import { AlertManager } from 'alert-helper';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class ActionContainer extends React.Component {
    handleSave (monthYearSetting) {
        requestAgent
            .post(url)
            .send(monthYearSetting)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('we succeeded to store month-year setting.' +
                    ' if you can public this calendar to operators, please click public calendar button.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with storing month-year setting...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
    }

    handlePublish (monthYearSetting) {
        requestAgent
            .post(url)
            .send(monthYearSetting.id)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('we succeeded to publish month-year setting.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with publishing month-year setting...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
    }

    render ({ monthYearSetting }) {
        return (
            <React.Fragment>
                <Button variant="contained" color="default" onClick={() => window.history.back()}>
                    Go Back
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.handleSave(monthYearSetting)}>
                    Save
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.handlePublish(monthYearSetting)}>
                    Publish Calendar
                </Button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    monthYearSetting: state.monthYearSetting
});

export default connect(mapStateToProps)(ActionContainer);
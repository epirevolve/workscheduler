import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Button from '@material-ui/core/Button';

import { AlertManager } from 'alert-helper';

const dataset = document.querySelector('script[src*="scheduler-monthly-setting"]').dataset;
const url = dataset.urlSave;

class MonthlySettingContainer extends React.Component {
    handleSave (monthlySetting, fixedSchedules) {
        requestAgent
            .post(url)
            .send({'monthlySetting': monthlySetting, 'fixedSchedules': fixedSchedules})
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
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger')
            });
    }

    handlePublish (monthlySetting, fixedSchedules) {
        requestAgent
            .post(`${url}/public`)
            .send({'monthlySetting': monthlySetting, 'fixedSchedules': fixedSchedules})
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('we succeeded to publish monthly setting.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with publishing monthly setting...';
                alertManager.append(`Oops, Sorry... ${message}`, 'alert-danger')
            });
    }

    render () {
        const { monthlySetting, fixedSchedules } = this.props;

        return (
            <>
                <div className="my-4">
                    <Button className="mr-3" variant="contained" color="primary" size="large"
                        onClick={() => this.handleSave(monthlySetting, fixedSchedules)}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" size="large"
                        onClick={() => this.handlePublish(monthlySetting, fixedSchedules)}>
                        Publish Calendar
                    </Button>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    monthlySetting: state.monthlySetting,
    fixedSchedules: state.fixedSchedules
});

export default connect(mapStateToProps)(MonthlySettingContainer);
import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Button from '@material-ui/core/Button';

import { AlertManager } from 'alert-helper';

const $script = $('script[src*="scheduler-yearly-setting"]');
const url = $script.data('urlSave');

class YearlySettingContainer extends React.Component {
    handleSave (yearlySetting) {
        requestAgent
            .post(url)
            .send(yearlySetting)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const alertManager = new AlertManager('#alertContainer');
                alertManager.append('successfully storing scheduler yearly setting.', 'alert-info')
            })
            .catch(err => {
                const res = JSON.parse(err.response.text);
                const alertManager = new AlertManager('#alertContainer');
                const message = res.errorMessage || 'we have some trouble with storing yearly setting...';
                alertManager.append(`Oops, Sorry ${message}`, 'alert-danger')
            });
    }

    render () {
        const { yearlySetting } = this.props;

        return (
            <React.Fragment>
                <div className="my-4">
                    <Button className="mr-3" variant="outlined" color="default" size="large"
                        onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                    <Button className="mr-3" variant="contained" color="primary" size="large"
                        onClick={() => this.handleSave(yearlySetting)}>
                        Save
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    yearlySetting: state.yearlySetting
});

export default connect(mapStateToProps)(YearlySettingContainer);
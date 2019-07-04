import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Button from '@material-ui/core/Button';

import { showSnackbar } from 'snackbarActions';

const dataset = document.querySelector('script[src*="schedulerBasic"]').dataset;
const url = dataset.url;

class BasicSettingContainer extends React.Component {
    handleSave (scheduler) {
        requestAgent
            .put(url)
            .send(scheduler)
            .set('X-CSRFToken', csrfToken)
            .then(() => {
                //dispach(showSnackbar('successfully storing scheduler basic setting.'));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with storing basic setting...';
                //dispach(showSnackbar(`Oops, Sorry... ${message}`));
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
        );
    }
}

const mapStateToProps = (state) => ({
    scheduler: state.scheduler
});

export default connect(mapStateToProps)(BasicSettingContainer);
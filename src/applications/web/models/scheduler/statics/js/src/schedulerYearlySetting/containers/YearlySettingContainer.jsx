import React from 'react';
import { connect } from 'react-redux';

import requestAgent from 'superagent';

import Button from '@material-ui/core/Button';

import { showSnackbar } from 'snackbarActions';

const dataset = document.querySelector('script[src*="schedulerYearly"]').dataset;
const url = dataset.url;

class YearlySettingContainer extends React.Component {
    handleSave (yearlySetting) {
        requestAgent
            .post(url)
            .send(yearlySetting)
            .set('X-CSRFToken', csrfToken)
            .then((_res) => {
                //dispatch(showSnackbar('successfully storing scheduler yearly setting.'));
            })
            .catch((err) => {
                const res = JSON.parse(err.response.text);
                const message = res.errorMessage || 'we have some trouble with storing yearly setting...';
                //dispatch(showSnackbar(`Oops, Sorry... ${message}`));
            });
    }

    render () {
        const { yearlySetting } = this.props;

        return (
            <>
                <div className="my-4">
                    <Button className="mr-3" variant="contained" color="primary" size="large"
                        onClick={() => this.handleSave(yearlySetting)}>
                        Save
                    </Button>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    yearlySetting: state.yearlySetting
});

export default connect(mapStateToProps)(YearlySettingContainer);
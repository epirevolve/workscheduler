import React from 'react'

import requestAgent from 'superagent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

class publishState extends React.Component {
    handlePublish () {
        requestAgent
            .post(url)
            .send({'scheduleId': scheduleId})
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

    handleStop () {

    }

    render () {
        const isPublished = true ? 'published' : 'not published'
        return (
            <div css={css`
                display: flex;
                color: lightslategray !important;
                margin-top: 1rem;
            `}>
                <Typography variant="h5">{isPublished}</Typography>
                <Button onClick={this.handlePublish} variant="outlined" color="default">
                    Publish
                </Button>
                <Button onClick={this.handleStop} color="default">
                    Stop
                </Button>
            </div>
        )
    }
}

export default publishState;
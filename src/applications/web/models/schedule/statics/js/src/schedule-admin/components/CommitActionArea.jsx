import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mt1, mt3, mr3 } from 'margin';
import { floatl, floatr } from 'float';

const wrapperCss = css({
	color: 'lightslategray !important',
},
mt3);

const renderActionByPublicity = (isPublished, onTerminateSchedule, onPublicSchedule) => {
    if (isPublished) {
        return (
            <Button onClick={onTerminateSchedule} color="default" size="large" css={mr3}>
                Terminate
            </Button>
        );
    }
    else {
        return (
            <Button onClick={onPublicSchedule} variant="outlined" color="secondary"
                size="large" css={mr3}>
                Publish
            </Button>
        );
    }
}

const commitActionArea = ({ schedules, isPublished, onSaveSchedules, onPublicSchedule, onTerminateSchedule }) => {
    const button = renderActionByPublicity(isPublished, onTerminateSchedule, onPublicSchedule);

    return (
        <div css={wrapperCss}>
            <Typography variant="h5" css={floatl}>
                This schedule is {isPublished ? 'published' : 'not published'}.
            </Typography>
            <div css={floatr}>
                <Button onClick={() => onSaveSchedules(schedules)} variant="outlined" color="primary"
                    size="large" css={mr3}>
                    Save
                </Button>
                {button}
            </div>
        </div>
    );
};

export default commitActionArea;
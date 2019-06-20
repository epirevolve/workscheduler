import React from 'react';

import Typography from '@material-ui/core/Typography';
import { CSVLink } from "react-csv";

import ProgressButton from 'ProgressButton';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { mt5, mr3, mb3 } from 'margin';
import { floatl, floatr } from 'float';

const actionCss = css({
	display: 'inline-flex',
	'& > div': css({},mr3)
}
,floatr);

const actionAreaCss = css({
	color: 'lightslategray !important',
},
mt5,mb3);

const renderActionByPublicity = (isPublished, isProgressing, onWithdrawSchedules, onPublishSchedules) => {
    const wrapButtonCreation = (label, handleClick) =>
        <ProgressButton label={label} handleClick={handleClick} isProgressing={isProgressing} />;
    if (isPublished) {
        return wrapButtonCreation('Withdraw', onWithdrawSchedules);
    }
    else {
        return wrapButtonCreation('Publish', onPublishSchedules);
    }
}

const commitActionArea = ({
        schedules, isPublished, isProgressing,
        onSaveSchedules, onWithdrawSchedules, onPublishSchedules
    }) => {
    const button = renderActionByPublicity(isPublished, isProgressing,
        () => onWithdrawSchedules(schedules), () => onPublishSchedules(schedules));

    return (
        <div css={actionAreaCss}>
            <Typography variant="h5" css={floatl}>
                This schedule is {isPublished ? 'published' : 'not published'}.
            </Typography>
            <div css={actionCss}>
                <ProgressButton label={'Save'} handleClick={() => onSaveSchedules(schedules)}
                    isProgressing={isProgressing} color="primary" />
                {button}
            </div>
        </div>
    );
};

export default commitActionArea;